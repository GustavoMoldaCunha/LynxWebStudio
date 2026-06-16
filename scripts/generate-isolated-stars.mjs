import fs from 'fs'
import { constellationClusters } from '../src/config/constellationClusters.js'
import { generateIsolatedStars } from '../src/utils/generateIsolatedStars.js'

const COUNT = 108
const stars = generateIsolatedStars(COUNT, { clusters: constellationClusters, seed: 58291 })

if (stars.length < COUNT) {
  console.error(`Only placed ${stars.length}/${COUNT} stars. Increase maxAttempts or reduce density.`)
  process.exit(1)
}

const body = stars
  .map((star) => `  { x: ${star.x}, y: ${star.y}, r: ${star.r}, opacity: ${star.opacity} },`)
  .join('\n')

const file = `export const isolatedStars = [
${body}
]
`

fs.writeFileSync('src/config/isolatedStars.generated.js', file)
console.log({ total: stars.length, inside: stars.filter((star) => star.zone === 'inside').length })
