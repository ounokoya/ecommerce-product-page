// Galerie : photo affichée, miniatures, flèches et visionneuse — ADR-0005, ADR-0006 ; spec §5 (Q7)

import { closeOnBackdrop, desktop } from './dialog.js'

export function initGallery() {
  const views = document.querySelectorAll('[data-gallery]') // la page et la visionneuse
  const lightbox = document.getElementById('lightbox')
  const count = views[0].querySelectorAll('[data-slide]').length
  let current = 0

  // Les deux vues affichent toujours la même photo : à la fermeture de la visionneuse,
  // la page montre la dernière photo vue (Q7). Les flèches bouclent.
  function show(index) {
    current = (index + count) % count
    for (const view of views) {
      view.querySelectorAll('[data-slide]').forEach((slide, i) => {
        slide.hidden = i !== current
      })
      for (const thumb of view.querySelectorAll('[data-show]')) {
        thumb.setAttribute('aria-pressed', String(Number(thumb.dataset.show) === current))
      }
    }
  }

  for (const view of views) {
    for (const arrow of view.querySelectorAll('[data-step]')) {
      arrow.addEventListener('click', () => show(current + Number(arrow.dataset.step)))
    }
    for (const thumb of view.querySelectorAll('[data-show]')) {
      thumb.addEventListener('click', () => show(Number(thumb.dataset.show)))
    }
  }

  document.querySelector('[data-open-lightbox]').addEventListener('click', () => lightbox.showModal())
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close())
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1)
    if (event.key === 'ArrowRight') show(current + 1)
  })
  closeOnBackdrop(lightbox)

  // La visionneuse n'existe qu'en desktop
  desktop.addEventListener('change', (event) => {
    if (!event.matches) lightbox.close()
  })
}
