import Lenis from '@studio-freight/lenis'

let lenis = null
let rafId = null

const DEFAULT_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export const SMOOTH_SCROLL_OPTIONS = {
  duration: 1.35,
  easing: DEFAULT_EASING,
  offset: -32,
}

export function getLenis() {
  return lenis
}

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.1,
    duration: SMOOTH_SCROLL_OPTIONS.duration,
    easing: DEFAULT_EASING,
    smoothWheel: true,
  })

  function raf(time) {
    lenis.raf(time)
    rafId = requestAnimationFrame(raf)
  }

  rafId = requestAnimationFrame(raf)

  document.addEventListener('click', handleAnchorClick)

  return lenis
}

export function destroyLenis() {
  document.removeEventListener('click', handleAnchorClick)

  if (rafId !== null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }

  if (lenis) {
    lenis.destroy()
    lenis = null
  }
}

export function getNavbarOffset() {
  const navbar = document.querySelector('.navbar')
  return navbar ? -(navbar.getBoundingClientRect().height + 12) : -88
}

export function scrollTo(target, options = {}) {
  const { onComplete, force = false, ...rest } = options
  const scrollOptions = {
    ...SMOOTH_SCROLL_OPTIONS,
    offset: rest.offset ?? getNavbarOffset(),
    ...rest,
    force,
    onComplete: (instance) => {
      onComplete?.(instance)
    },
  }

  if (lenis) {
    lenis.resize()
    lenis.scrollTo(target, scrollOptions)
    return
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.setTimeout(() => onComplete?.(), scrollOptions.duration * 1000)
}

export function scrollToHash(hash, options = {}) {
  if (!hash) return false

  const selector = hash.startsWith('#') ? hash : `#${hash}`
  const el = document.querySelector(selector)
  if (!el) return false

  scrollTo(el, { force: true, ...options })
  return true
}

export function scrollToHashWhenReady(hash, options = {}, attempt = 0) {
  if (scrollToHash(hash, options)) return true
  if (attempt >= 24) return false

  requestAnimationFrame(() => scrollToHashWhenReady(hash, options, attempt + 1))
  return false
}

function handleAnchorClick(event) {
  const anchor = event.target.closest('a[href*="#"]')
  if (!anchor || anchor.closest('.navbar')) return

  const href = anchor.getAttribute('href')
  if (!href || href === '#') return

  const url = new URL(href, window.location.href)
  const hash = url.hash
  if (!hash || hash === '#') return

  if (url.pathname !== window.location.pathname) return

  const target = document.querySelector(hash)
  if (!target) return

  event.preventDefault()
  scrollTo(target, { force: true })
}
