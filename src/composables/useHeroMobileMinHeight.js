import { onMounted, onUnmounted } from 'vue'

const MOBILE_MAX_WIDTH = 480
const MOUNTAIN_GAP_PX = 0
const CONTENT_GAP_PX = 12

function getConstellationBandVisualExtent(band) {
  const bandRect = band.getBoundingClientRect()
  let visualTop = bandRect.bottom
  let visualBottom = bandRect.top

  const svg = band.querySelector('.hero-constellations')
  if (!svg) {
    return { topInset: 0, bottomInset: 0 }
  }

  for (const el of svg.querySelectorAll('circle, path')) {
    const rect = el.getBoundingClientRect()
    if (rect.width <= 0 && rect.height <= 0) continue
    visualTop = Math.min(visualTop, rect.top)
    visualBottom = Math.max(visualBottom, rect.bottom)
  }

  if (visualBottom <= bandRect.top) {
    return { topInset: 0, bottomInset: 0 }
  }

  return {
    topInset: Math.max(0, visualTop - bandRect.top),
    bottomInset: Math.max(0, bandRect.bottom - visualBottom),
  }
}

function getMountainMetrics(back) {
  const backRect = back.getBoundingClientRect()
  const pathRect = back.querySelector('path')?.getBoundingClientRect()

  if (!pathRect) {
    return { top: backRect.top, visibleHeight: backRect.height }
  }

  return {
    top: pathRect.top,
    visibleHeight: backRect.bottom - pathRect.top,
  }
}

function clearMobileHeroVars(hero, band) {
  hero?.style.removeProperty('--hero-mobile-min-height')
  band?.style.removeProperty('--hero-constellation-top')
}

export function useHeroMobileMinHeight() {
  let resizeObserver

  function sync() {
    const hero = document.querySelector('.banner.hero')
    if (!hero) return

    const band = document.querySelector('.hero-constellation-band')
    if (window.innerWidth > MOBILE_MAX_WIDTH) {
      clearMobileHeroVars(hero, band)
      return
    }

    const back = document.querySelector('.hero-terrain__layer--back')
    const copy = document.querySelector('.banner-copy')
    if (!band || !back || !copy) return

    const viewportHeight = window.innerHeight
    const heroTop = hero.getBoundingClientRect().top
    const copyBottomRel = copy.getBoundingClientRect().bottom - heroTop
    const bandHeight = band.getBoundingClientRect().height
    const { bottomInset } = getConstellationBandVisualExtent(band)
    const visualSpan = bandHeight - bottomInset
    const mountain = getMountainMetrics(back)
    const mountainHeight = mountain.visibleHeight

    const requiredHeight = Math.ceil(
      copyBottomRel +
        CONTENT_GAP_PX +
        visualSpan +
        MOUNTAIN_GAP_PX +
        mountainHeight,
    )
    hero.style.setProperty(
      '--hero-mobile-min-height',
      `${Math.max(viewportHeight, requiredHeight)}px`,
    )

    requestAnimationFrame(() => {
      const heroTopNow = hero.getBoundingClientRect().top
      const copyBottom = copy.getBoundingClientRect().bottom - heroTopNow
      const mountainTop = getMountainMetrics(back).top - heroTopNow
      const height = band.getBoundingClientRect().height
      const { topInset, bottomInset } = getConstellationBandVisualExtent(band)

      const slotTop = copyBottom + CONTENT_GAP_PX
      const slotBottom = mountainTop - MOUNTAIN_GAP_PX
      const top = Math.max(slotTop - topInset, slotBottom - height + bottomInset)

      band.style.setProperty('--hero-constellation-top', `${top}px`)
    })
  }

  onMounted(() => {
    sync()
    window.addEventListener('resize', sync, { passive: true })

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(sync)

      const hero = document.querySelector('.banner.hero')
      const copy = document.querySelector('.banner-copy')
      const band = document.querySelector('.hero-constellation-band')
      const back = document.querySelector('.hero-terrain__layer--back')

      if (hero) resizeObserver.observe(hero)
      if (copy) resizeObserver.observe(copy)
      if (band) resizeObserver.observe(band)
      if (back) resizeObserver.observe(back)
    }

    if (document.fonts?.ready) {
      document.fonts.ready.then(sync)
    }

    requestAnimationFrame(sync)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', sync)
    resizeObserver?.disconnect()
    clearMobileHeroVars(
      document.querySelector('.banner.hero'),
      document.querySelector('.hero-constellation-band'),
    )
  })
}
