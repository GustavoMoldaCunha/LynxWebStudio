import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const browser = await chromium.launch({ headless: true })
try {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 360, height: 640 }, { width: 844, height: 390 }]) {
    const page = await browser.newPage({ viewport })
    const errors = []
    page.on('pageerror', e => errors.push(e.message))
    await page.goto('http://127.0.0.1:5180', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForSelector('.services-static')
    const geometry = await page.evaluate(() => {
      const track = document.querySelector('.services-static')
      const layout = document.querySelector('.services-static__layout')
      return { start: scrollY + track.getBoundingClientRect().top - parseFloat(getComputedStyle(layout).top), segment: Math.max(320, innerHeight * .7), height: layout.offsetHeight, top: parseFloat(getComputedStyle(layout).top), trackHeight: track.offsetHeight }
    })
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), geometry.start)
    await page.waitForTimeout(1100)
    const decoration = await page.locator('.services-static__decor').evaluate(e => {
      const star = e.querySelector('.section-deco-sparkle')
      const line = e.querySelector('.section-deco-line')
      const s = star.getBoundingClientRect()
      const l = line.getBoundingClientRect()
      return { color: getComputedStyle(star).color, size: s.width, thickness: l.height, gap: l.left - s.right, alignment: Math.abs(s.top + s.height / 2 - l.top - l.height / 2) }
    })
    assert.equal(decoration.color, 'rgb(56, 15, 233)')
    assert.equal(decoration.size, 24)
    assert.equal(decoration.thickness, 6)
    assert.equal(decoration.gap, 8)
    assert.ok(decoration.alignment < 1)
    if (viewport.width === 1440) await page.screenshot({ path: 'consultorias-decor-desktop.png' })
    for (const index of [0, 1, 2, 1, 0]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), geometry.start + index * geometry.segment)
      await page.waitForTimeout(400)
      const state = await page.evaluate(() => {
        const panels = [...document.querySelectorAll('.services-static__card-content')]
        const track = document.querySelector('.services-static')
        return { active: [...document.querySelectorAll('.services-static__item')].findIndex(e => e.classList.contains('is-active')), opacity: panels.map(e => +getComputedStyle(e).opacity), top: document.querySelector('.services-static__layout').getBoundingClientRect().top, overflow: track.scrollWidth > track.clientWidth }
      })
      assert.equal(state.active, index)
      assert.ok(state.opacity[index] > .999)
      assert.ok(Math.abs(state.top - geometry.top) < 2)
      assert.equal(state.overflow, false)
    }
    // Stopping anywhere in the former fade range must settle on one full card.
    for (const progress of [.7, .85, 1.7, 1.85, 1.7, .85, .7]) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), geometry.start + progress * geometry.segment)
      await page.waitForTimeout(400)
      const opacity = await page.locator('.services-static__card-content').evaluateAll(es => es.map(e => +getComputedStyle(e).opacity))
      const expected = Math.floor(progress) + (progress % 1 >= .825 ? 1 : 0)
      assert.deepEqual(opacity, [0, 1, 2].map(i => i === expected ? 1 : 0))
    }
    await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), geometry.start + 2.5 * geometry.segment + 100)
    await page.waitForTimeout(400)
    assert.ok(await page.locator('.services-static__layout').evaluate((e, top) => e.getBoundingClientRect().top < top - 90, geometry.top))
    // The panel may be taller than a landscape viewport; invoke its navigation
    // without forcing a pointer click outside the visible viewport.
    await page.locator('.services-static__item').nth(1).evaluate(e => e.click())
    await page.waitForTimeout(1800)
    assert.equal(await page.locator('.services-static__item.is-active').getAttribute('aria-current'), 'step')
    assert.equal(await page.locator('.services-static__item').nth(1).evaluate(e => e.classList.contains('is-active')), true)
    assert.deepEqual(errors, [])
    console.log('PASS', viewport)
    await page.close()
  }
} finally { await browser.close() }
