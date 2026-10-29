import assert from 'node:assert/strict'
import { chromium } from 'playwright'
const browser = await chromium.launch()
try {
  for (const viewport of [{ width: 1366, height: 650 }, { width: 1280, height: 600 }, { width: 1440, height: 900 }, { width: 1024, height: 600 }, { width: 390, height: 640 }, { width: 844, height: 390 }]) {
    const page = await browser.newPage({ viewport })
    await page.goto('http://127.0.0.1:5180', { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    for (const index of [0, 1, 2, 1, 0]) {
      await page.evaluate(i => {
        const track = document.querySelector('.services-static')
        const layout = document.querySelector('.services-static__layout')
        window.scrollTo({ top: scrollY + track.getBoundingClientRect().top - parseFloat(getComputedStyle(layout).top) + i * Math.max(320, innerHeight * .7), behavior: 'instant' })
      }, index)
      await page.waitForTimeout(150)
      const state = await page.evaluate(() => {
        const layout = document.querySelector('.services-static__layout')
        const rect = layout.getBoundingClientRect()
        return { topGap: rect.top - document.querySelector('.navbar').getBoundingClientRect().bottom, bottomGap: innerHeight - rect.bottom, active: [...document.querySelectorAll('.services-static__item')].findIndex(e => e.classList.contains('is-active')), overflow: layout.scrollHeight > layout.clientHeight + 1 }
      })
      assert.ok(state.topGap >= 15, JSON.stringify(state))
      assert.ok(state.bottomGap >= 15, JSON.stringify(state))
      assert.equal(state.active, index)
      if (viewport.width >= 1280) assert.equal(state.overflow, false, 'notebook content should fit')
    }
    if (viewport.width === 1366) await page.screenshot({ path: 'consultorias-notebook.png' })
    console.log('PASS viewport margins', viewport)
    await page.close()
  }
} finally { await browser.close() }
