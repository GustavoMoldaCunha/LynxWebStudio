import fs from 'fs'
import { constellationClusters } from '../src/config/constellationClusters.js'
import { distanceToHeroCircleCenter } from '../src/config/heroStarMapLayout.js'
import { isolatedStars } from '../src/config/isolatedStars.generated.js'
import { generateBackgroundStars } from '../src/utils/generateBackgroundStars.js'

const COUNT = 520
const stars = generateBackgroundStars(COUNT, {
  clusters: constellationClusters,
  isolatedStars,
  seed: 73104,
})

if (stars.length < COUNT) {
  console.error(`Only placed ${stars.length}/${COUNT} background stars.`)
  process.exit(1)
}

const body = stars
  .map((star) => {
    const twinkle = star.twinkle
      ? `, twinkle: true, twinkleDuration: ${star.twinkleDuration}, twinkleDelay: ${star.twinkleDelay}`
      : ''
    return `  { x: ${star.x}, y: ${star.y}, r: ${star.r}${twinkle} },`
  })
  .join('\n')

const file = `export const backgroundStars = [
${body}
]
`

fs.writeFileSync('src/config/backgroundStars.generated.js', file)
const bands = [
  { label: 'top', min: 0, max: 25 },
  { label: 'upper', min: 25, max: 50 },
  { label: 'middle', min: 50, max: 75 },
  { label: 'lower', min: 75, max: 100 },
]

console.log({
  total: stars.length,
  twinkle: stars.filter((star) => star.twinkle).length,
  circleCore: stars.filter((star) => distanceToHeroCircleCenter(star.x, star.y) <= 20).length,
  bands: Object.fromEntries(
    bands.map(({ label, min, max }) => [
      label,
      stars.filter((star) => star.y >= min && star.y < max).length,
    ]),
  ),
})
