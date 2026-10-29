import { chromium } from 'playwright'
import assert from 'node:assert/strict'
const browser = await chromium.launch()
for (const width of [1536, 1440, 1366, 1280, 1024, 390, 360]) {
  const page = await browser.newPage({ viewport: { width, height: 768 } })
  await page.goto('http://127.0.0.1:5180', { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  for (const fraction of [0, .25, .5, .75, 1]) {
    await page.evaluate(f => window.scrollTo({ left: 200, top: f * (document.documentElement.scrollHeight - innerHeight), behavior: 'instant' }), fraction)
    await page.waitForTimeout(100)
    const state = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, x: scrollX }))
    assert.equal(state.scrollWidth, state.width, `overflow at ${width}, ${fraction}`)
    assert.equal(state.x, 0)
  }
  await page.waitForTimeout(1100)
  const contentFits = await page.locator('.services-static__card-content').evaluateAll(es => es.every(e => e.scrollWidth <= e.clientWidth + 1))
  assert.equal(contentFits, true, `consultoria content overflow at ${width}`)
  console.log('PASS horizontal scroll', width)
  await page.close()
}
await browser.close()
