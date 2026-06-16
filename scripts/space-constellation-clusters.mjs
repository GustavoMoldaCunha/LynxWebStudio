import fs from 'fs'
import { constellationClusters } from '../src/config/constellationClusters.js'
import {
  focalRepulsionStrength,
  frameConvergenceNudge,
} from '../src/utils/constellationComposition.js'
import {
  MIN_CONSTELLATION_GAP,
  clusterCenterDistance,
  clusterSpacingRequired,
  validateClusterLayout,
} from '../src/utils/constellationWorldGeometry.js'

const FIELD_MARGIN = 4
const FIELD_MAX = 96
const MAX_PASSES = 120
const COMPOSITION_PASSES = 18

function clusterWeight(cluster) {
  return cluster.scale * cluster.nodes.length * (cluster.spread ? 1.25 : 1)
}

function clampPosition(pos) {
  pos.x = Math.min(FIELD_MAX, Math.max(FIELD_MARGIN, pos.x))
  pos.y = Math.min(FIELD_MAX, Math.max(FIELD_MARGIN, pos.y))
}

function pushPairApart(clusters, positions, i, j) {
  const clusterA = clusters[i]
  const clusterB = clusters[j]
  const posA = positions[i]
  const posB = positions[j]
  const required = clusterSpacingRequired(clusterA, clusterB, MIN_CONSTELLATION_GAP)
  const dx = posB.x - posA.x
  const dy = posB.y - posA.y
  const distance = Math.hypot(dx, dy) || 0.01

  if (distance >= required) return false

  const push = (required - distance) / 2 + 0.08
  const nx = dx / distance
  const ny = dy / distance
  const weightA = clusterWeight(clusterA)
  const weightB = clusterWeight(clusterB)
  const total = weightA + weightB

  posA.x -= nx * push * (weightB / total) * 2
  posA.y -= ny * push * (weightB / total) * 2
  posB.x += nx * push * (weightA / total) * 2
  posB.y += ny * push * (weightA / total) * 2

  clampPosition(posA)
  clampPosition(posB)
  return true
}

function separateClusters(clusters) {
  const positions = clusters.map((cluster) => ({ x: cluster.x, y: cluster.y }))

  for (let pass = 0; pass < MAX_PASSES; pass++) {
    let moved = false

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        if (pushPairApart(clusters, positions, i, j)) moved = true
      }
    }

    if (!moved) break
  }

  return positions
}

function applyCompositionalPasses(clusters, positions) {
  for (let pass = 0; pass < COMPOSITION_PASSES; pass++) {
    for (let i = 0; i < clusters.length; i++) {
      const cluster = clusters[i]
      const pos = positions[i]
      const weight = clusterWeight(cluster) / 2.8
      const repel = focalRepulsionStrength(pos.x, pos.y, weight)
      const frame = frameConvergenceNudge(pos.x, pos.y, cluster)

      pos.x += repel.x * 0.55 + frame.x * 0.55
      pos.y += repel.y * 0.55 + frame.y * 0.55
      clampPosition(pos)
    }

    for (let separation = 0; separation < 8; separation++) {
      for (let i = 0; i < clusters.length; i++) {
        for (let j = i + 1; j < clusters.length; j++) {
          pushPairApart(clusters, positions, i, j)
        }
      }
    }
  }
}

function formatCluster(cluster) {
  const nodes = cluster.nodes
    .map((node) => `      { x: ${node.x}, y: ${node.y}, r: ${node.r} },`)
    .join('\n')

  const spreadLine = cluster.spread ? '\n    spread: true,' : ''
  const edges = JSON.stringify(cluster.edges)

  return `  {
    id: '${cluster.id}',
    x: ${cluster.x},
    y: ${cluster.y},
    scale: ${cluster.scale},${spreadLine}
    nodes: [
${nodes}
    ],
    edges: ${edges},
  },`
}

const positions = separateClusters(constellationClusters)
applyCompositionalPasses(constellationClusters, positions)

const draft = constellationClusters.map((cluster, index) => ({
  ...cluster,
  x: positions[index].x,
  y: positions[index].y,
}))

const issues = validateClusterLayout(draft)
if (issues.length) {
  console.error('Layout still has spacing issues:\n', issues.join('\n'))
  process.exit(1)
}

const spaced = draft.map((cluster) => ({
  ...cluster,
  x: +cluster.x.toFixed(2),
  y: +cluster.y.toFixed(2),
}))

let roundedIssues = validateClusterLayout(spaced)
if (roundedIssues.length) {
  for (let pass = 0; pass < 20 && roundedIssues.length; pass++) {
    for (let i = 0; i < spaced.length; i++) {
      for (let j = i + 1; j < spaced.length; j++) {
        const pos = spaced.map((cluster) => ({ x: cluster.x, y: cluster.y }))
        if (pushPairApart(spaced, pos, i, j)) {
          spaced[i].x = +pos[i].x.toFixed(2)
          spaced[i].y = +pos[i].y.toFixed(2)
          spaced[j].x = +pos[j].x.toFixed(2)
          spaced[j].y = +pos[j].y.toFixed(2)
        }
      }
    }
    roundedIssues = validateClusterLayout(spaced)
  }
}

if (roundedIssues.length) {
  console.error('Layout still has spacing issues after rounding:\n', roundedIssues.join('\n'))
  process.exit(1)
}

const clusterBlock = spaced.map(formatCluster).join('\n')
const file = `/**
 * Single-layer constellation field for the hero background.
 * Cluster edges are compact by default; clusters with \`spread: true\`
 * may include a few longer spans between distant nodes.
 * Cluster origins enforce a minimum hull gap of ${MIN_CONSTELLATION_GAP} viewBox units.
 * Layout bias keeps the hero focal zone (title) legible while framing it peripherally.
 */

import { isolatedStars } from './isolatedStars.generated.js'

export const constellationClusters = [
${clusterBlock}
]

export const constellationField = {
  clusters: constellationClusters,
  isolatedStars,
}
`

fs.writeFileSync('src/config/constellationClusters.js', file)
console.log(`Spaced ${spaced.length} clusters with gap >= ${MIN_CONSTELLATION_GAP}`)
