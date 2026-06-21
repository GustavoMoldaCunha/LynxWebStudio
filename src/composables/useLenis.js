import Lenis from '@studio-freight/lenis'

let lenis = null
let rafId = null

export function getLenis() {
  return lenis
}

export function initLenis() {
  if (lenis) return lenis

  lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
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

export function scrollTo(target, options) {
  lenis?.scrollTo(target, options)
}

function handleAnchorClick(event) {
  const anchor = event.target.closest('a[href^="#"]')
  if (!anchor || !lenis) return

  const href = anchor.getAttribute('href')
  if (!href || href === '#') return

  const target = document.querySelector(href)
  if (!target) return

  event.preventDefault()
  lenis.scrollTo(target)
}
