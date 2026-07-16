import { onMounted, onUnmounted } from 'vue'

const STACKED_HERO_MAX_WIDTH = 920
const MOUNTAIN_GAP_PX = 0
const CONTENT_GAP_PX_MOBILE = 12
const CONTENT_GAP_PX_TABLET = 16
const CONSTELLATION_LIFT_PX_MOBILE = 0
const CONSTELLATION_LIFT_PX_TABLET = 0
const CONSTELLATION_DROP_PX_MOBILE = 0
const CONSTELLATION_DROP_PX_TABLET = 0
const BUTTON_CLEARANCE_PX = 8

function getContentGap() {
  return window.innerWidth <= 480 ? CONTENT_GAP_PX_MOBILE : CONTENT_GAP_PX_TABLET
}

function getConstellationLift() {
  return window.innerWidth <= 480 ? CONSTELLATION_LIFT_PX_MOBILE : CONSTELLATION_LIFT_PX_TABLET
}

function getConstellationDrop() {
  return window.innerWidth <= 480 ? CONSTELLATION_DROP_PX_MOBILE : CONSTELLATION_DROP_PX_TABLET
}

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

function shouldUseContentBasedHeroHeight(viewportWidth, viewportHeight) {
  if (viewportWidth <= 480) return false
  if (viewportWidth > STACKED_HERO_MAX_WIDTH) return false
  return viewportHeight >= 1000
}

function resolveHeroMinHeight(viewportWidth, viewportHeight, requiredHeight) {
  if (shouldUseContentBasedHeroHeight(viewportWidth, viewportHeight)) {
    return requiredHeight
  }

  return Math.max(viewportHeight, requiredHeight)
}

function getConstellationVisualBounds(top, height, topInset, bottomInset, lift) {
  return {
    visualTop: top + topInset - lift,
    visualBottom: top + height - bottomInset - lift,
  }
}

function resolveConstellationLift(preferredLift, availableSpace, neededSpan) {
  if (availableSpace >= neededSpan + 20) return preferredLift
  return Math.max(0, preferredLift - (neededSpan - availableSpace + 20))
}

function clearMobileHeroVars(hero, band) {
  hero?.style.removeProperty('--hero-mobile-min-height')
  band?.style.removeProperty('--hero-constellation-top')
  band?.style.removeProperty('--hero-constellation-lift')
}

export function useHeroMobileMinHeight() {
  let resizeObserver

  function sync() {
    const hero = document.querySelector('.banner.hero')
    if (!hero) return

    const band = document.querySelector('.hero-constellation-band')
    if (window.innerWidth > STACKED_HERO_MAX_WIDTH) {
      clearMobileHeroVars(hero, band)
      return
    }

    const back = document.querySelector('.hero-terrain__layer--back')
    const copy = document.querySelector('.banner-copy')
    const footer = document.querySelector('.banner-footer')
    if (!band || !back || !copy) return

    const viewportHeight = window.innerHeight
    const heroTop = hero.getBoundingClientRect().top
    const copyBottomRel = copy.getBoundingClientRect().bottom - heroTop
    const footerBottomRel = footer
      ? footer.getBoundingClientRect().bottom - heroTop
      : copyBottomRel
    const bandHeight = band.getBoundingClientRect().height
    const { topInset, bottomInset } = getConstellationBandVisualExtent(band)
    const visualSpan = bandHeight - bottomInset
    const mountain = getMountainMetrics(back)
    const mountainHeight = mountain.visibleHeight

    const contentGap = getContentGap()
    const preferredLift = getConstellationLift()
    const constellationDrop = getConstellationDrop()
    const minContentBottom = footerBottomRel + BUTTON_CLEARANCE_PX

    const requiredHeight = Math.ceil(
      minContentBottom +
        contentGap +
        topInset +
        preferredLift +
        visualSpan +
        MOUNTAIN_GAP_PX +
        mountainHeight +
        12,
    )
    hero.style.setProperty(
      '--hero-mobile-min-height',
      `${resolveHeroMinHeight(window.innerWidth, viewportHeight, requiredHeight)}px`,
    )

    requestAnimationFrame(() => {
      const heroTopNow = hero.getBoundingClientRect().top
      const heroHeight = hero.getBoundingClientRect().height
      const footerBottom = footer
        ? footer.getBoundingClientRect().bottom - heroTopNow
        : copy.getBoundingClientRect().bottom - heroTopNow
      const minVisualTop = footerBottom + BUTTON_CLEARANCE_PX
      const mountainTop = getMountainMetrics(back).top - heroTopNow
      const height = band.getBoundingClientRect().height
      const extent = getConstellationBandVisualExtent(band)
      const insetTop = extent.topInset
      const insetBottom = extent.bottomInset
      const slotTop = footerBottom + contentGap
      const slotBottom = mountainTop - MOUNTAIN_GAP_PX
      const visualHeight = Math.max(0, height - insetTop - insetBottom)
      const slotHeight = Math.max(0, slotBottom - slotTop)
      const neededSpan = visualHeight
      const availableSpace = Math.max(0, slotBottom - minVisualTop)
      const constellationLift = resolveConstellationLift(preferredLift, availableSpace, neededSpan)

      // Vertically center the visual constellation in the CTA → mountain gap
      let top = slotTop - insetTop + Math.max(0, (slotHeight - visualHeight) / 2)

      let { visualTop, visualBottom } = getConstellationVisualBounds(
        top,
        height,
        insetTop,
        insetBottom,
        constellationLift,
      )

      if (visualBottom > slotBottom) {
        top = slotBottom - height + insetBottom
        ;({ visualTop, visualBottom } = getConstellationVisualBounds(
          top,
          height,
          insetTop,
          insetBottom,
          constellationLift,
        ))
      }

      if (visualTop < minVisualTop) {
        top = minVisualTop - insetTop + constellationLift
        ;({ visualTop, visualBottom } = getConstellationVisualBounds(
          top,
          height,
          insetTop,
          insetBottom,
          constellationLift,
        ))
      }

      if (visualBottom > slotBottom) {
        const deficit = Math.ceil(visualBottom - slotBottom + 12)
        hero.style.setProperty(
          '--hero-mobile-min-height',
          `${resolveHeroMinHeight(window.innerWidth, viewportHeight, heroHeight + deficit)}px`,
        )
      }

      band.style.setProperty('--hero-constellation-top', `${top + constellationDrop}px`)
      band.style.setProperty('--hero-constellation-lift', `${constellationLift}px`)
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
      const footer = document.querySelector('.banner-footer')

      if (hero) resizeObserver.observe(hero)
      if (copy) resizeObserver.observe(copy)
      if (band) resizeObserver.observe(band)
      if (back) resizeObserver.observe(back)
      if (footer) resizeObserver.observe(footer)
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
