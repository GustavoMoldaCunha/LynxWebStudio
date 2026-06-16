/** Maximum local-space distance between connected constellation nodes. */
export const MAX_CLUSTER_EDGE_LENGTH = 9.5

/** Extended edge length for spread clusters (select long spans). */
export const MAX_SPREAD_EDGE_LENGTH = 18

/** Maximum local-space radius for nodes relative to the cluster origin. */
export const MAX_CLUSTER_NODE_RADIUS = 8

/** Extended radius for spread cluster nodes. */
export const MAX_SPREAD_NODE_RADIUS = 15

function nodeDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function ccw(a, b, c) {
  return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x)
}

export function segmentsIntersect(a, b, c, d) {
  if (
    (a.x === c.x && a.y === c.y) ||
    (a.x === d.x && a.y === d.y) ||
    (b.x === c.x && b.y === c.y) ||
    (b.x === d.x && b.y === d.y)
  ) {
    return false
  }

  return ccw(a, c, d) !== ccw(b, c, d) && ccw(a, b, c) !== ccw(a, b, d)
}

export function edgeCrossesEdges(edge, edges, nodes) {
  const [a, b] = edge
  return edges.some(([c, d]) => {
    if (a === c || a === d || b === c || b === d) return false
    return segmentsIntersect(nodes[a], nodes[b], nodes[c], nodes[d])
  })
}

export function compactClusterNodes(nodes, maxRadius = MAX_CLUSTER_NODE_RADIUS) {
  return nodes.map((node, index) => {
    if (index === 0) return { ...node }

    const distance = Math.hypot(node.x, node.y)
    if (distance <= maxRadius) return { ...node }

    const scale = maxRadius / distance
    return {
      ...node,
      x: +(node.x * scale).toFixed(1),
      y: +(node.y * scale).toFixed(1),
    }
  })
}

function find(parent, value) {
  if (parent[value] !== value) parent[value] = find(parent, parent[value])
  return parent[value]
}

function union(parent, rank, a, b) {
  const rootA = find(parent, a)
  const rootB = find(parent, b)
  if (rootA === rootB) return false

  if (rank[rootA] < rank[rootB]) parent[rootA] = rootB
  else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA
  else {
    parent[rootB] = rootA
    rank[rootA]++
  }

  return true
}

export function buildCompactEdges(nodes, maxLength = MAX_CLUSTER_EDGE_LENGTH) {
  const count = nodes.length
  if (count < 2) return []

  const candidates = []

  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const distance = nodeDistance(nodes[i], nodes[j])
      if (distance <= maxLength) {
        candidates.push({ i, j, distance })
      }
    }
  }

  candidates.sort((a, b) => a.distance - b.distance)

  const parent = Array.from({ length: count }, (_, index) => index)
  const rank = Array(count).fill(0)
  const edges = []

  for (const { i, j } of candidates) {
    if (union(parent, rank, i, j)) {
      edges.push([i, j])
      if (edges.length === count - 1) break
    }
  }

  if (edges.length < count - 1) {
    for (const { i, j } of candidates) {
      const exists = edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
      if (exists) continue
      if (union(parent, rank, i, j)) {
        edges.push([i, j])
        if (edges.length === count - 1) break
      }
    }
  }

  for (const { i, j } of candidates) {
    if (edges.length >= count) break

    const exists = edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))
    if (exists) continue
    if (!edgeCrossesEdges([i, j], edges, nodes)) {
      edges.push([i, j])
    }
  }

  return edges
}

export function refineClusterGeometry(cluster) {
  const maxRadius = cluster.spread ? MAX_SPREAD_NODE_RADIUS : MAX_CLUSTER_NODE_RADIUS
  const maxLength = cluster.spread ? MAX_SPREAD_EDGE_LENGTH : MAX_CLUSTER_EDGE_LENGTH
  const nodes = compactClusterNodes(cluster.nodes, maxRadius)
  const edges = buildCompactEdges(nodes, maxLength)

  return {
    ...cluster,
    nodes,
    edges,
  }
}

export function validateClusterGeometry(cluster) {
  const issues = []
  const { nodes, edges } = cluster
  const maxLength = cluster.spread ? MAX_SPREAD_EDGE_LENGTH : MAX_CLUSTER_EDGE_LENGTH

  for (const [a, b] of edges) {
    const distance = nodeDistance(nodes[a], nodes[b])
    if (distance > maxLength + 0.01) {
      issues.push(`edge ${a}-${b} too long (${distance.toFixed(2)})`)
    }
  }

  for (let i = 0; i < edges.length; i++) {
    for (let j = i + 1; j < edges.length; j++) {
      const [a, b] = edges[i]
      const [c, d] = edges[j]
      if (a === c || a === d || b === c || b === d) continue
      if (segmentsIntersect(nodes[a], nodes[b], nodes[c], nodes[d])) {
        issues.push(`crossing ${a}-${b} x ${c}-${d}`)
      }
    }
  }

  return issues
}
