import { constellationNodeRadius } from '../config/starScaleHierarchy.js'
import { MIN_ISOLATED_STAR_DISTANCE } from '../config/isolatedStarSizes.js'

/** Minimum empty gap between constellation cluster hulls (viewBox units). */
export const MIN_CONSTELLATION_GAP = 4

export function getClusterWorldExtent(cluster) {
  const scale = cluster.scale
  let max = 0

  for (let index = 0; index < cluster.nodes.length; index++) {
    const node = cluster.nodes[index]
    const nodeReach = Math.hypot(node.x * scale, node.y * scale)
    const nodeRadius = constellationNodeRadius(cluster, index) * scale
    max = Math.max(max, nodeReach + nodeRadius)
  }

  return +max.toFixed(2)
}

export function clusterSpacingRequired(clusterA, clusterB, gap = MIN_CONSTELLATION_GAP) {
  return getClusterWorldExtent(clusterA) + getClusterWorldExtent(clusterB) + gap
}

export function clusterCenterDistance(clusterA, clusterB, posA = clusterA, posB = clusterB) {
  return Math.hypot(posA.x - posB.x, posA.y - posB.y)
}

export function clustersTooClose(clusterA, clusterB, gap = MIN_CONSTELLATION_GAP, posA = clusterA, posB = clusterB) {
  const required = clusterSpacingRequired(clusterA, clusterB, gap)
  const distance = clusterCenterDistance(clusterA, clusterB, posA, posB)
  return Math.round(distance * 10) < Math.round(required * 10)
}

export function validateClusterLayout(clusters, gap = MIN_CONSTELLATION_GAP) {
  const issues = []

  for (let i = 0; i < clusters.length; i++) {
    for (let j = i + 1; j < clusters.length; j++) {
      const a = clusters[i]
      const b = clusters[j]
      if (clustersTooClose(a, b, gap)) {
        const dist = clusterCenterDistance(a, b)
        const required = clusterSpacingRequired(a, b, gap)
        issues.push(`${a.id} ↔ ${b.id}: ${dist.toFixed(1)} < ${required.toFixed(1)}`)
      }
    }
  }

  return issues
}

export function distancePointToSegment(point, a, b) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const lenSq = dx * dx + dy * dy

  if (lenSq === 0) {
    return Math.hypot(point.x - a.x, point.y - a.y)
  }

  let t = ((point.x - a.x) * dx + (point.y - a.y) * dy) / lenSq
  t = Math.max(0, Math.min(1, t))

  return Math.hypot(point.x - (a.x + t * dx), point.y - (a.y + t * dy))
}

export function getConstellationWorldNodes(clusters) {
  const nodes = []

  for (const cluster of clusters) {
    const scale = cluster.scale

    cluster.nodes.forEach((node, index) => {
      nodes.push({
        x: cluster.x + node.x * scale,
        y: cluster.y + node.y * scale,
        r: constellationNodeRadius(cluster, index) * scale,
      })
    })
  }

  return nodes
}

export function getConstellationWorldSegments(clusters) {
  const segments = []

  for (const cluster of clusters) {
    const scale = cluster.scale

    for (const [a, b] of cluster.edges) {
      segments.push([
        {
          x: cluster.x + cluster.nodes[a].x * scale,
          y: cluster.y + cluster.nodes[a].y * scale,
        },
        {
          x: cluster.x + cluster.nodes[b].x * scale,
          y: cluster.y + cluster.nodes[b].y * scale,
        },
      ])
    }
  }

  return segments
}

export function violatesConstellationSpacing(candidate, clusters, minDistance = MIN_ISOLATED_STAR_DISTANCE) {
  const nodes = getConstellationWorldNodes(clusters)
  const segments = getConstellationWorldSegments(clusters)

  for (const node of nodes) {
    const clearance = minDistance + candidate.r + node.r
    if (Math.hypot(candidate.x - node.x, candidate.y - node.y) < clearance) {
      return true
    }
  }

  for (const [a, b] of segments) {
    const clearance = minDistance + candidate.r
    if (distancePointToSegment(candidate, a, b) < clearance) {
      return true
    }
  }

  return false
}
