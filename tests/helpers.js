import { readFileSync } from 'node:fs'
import { PNG } from 'pngjs'
import jpeg from 'jpeg-js'

// Les tests ne s'appuient que sur la spec : noms accessibles et textes alternatifs (§6),
// comportement (§5) — jamais sur des classes ou une structure HTML précise.

export async function open(page, width, height = 900) {
  await page.setViewportSize({ width, height })
  await page.goto('./')
  await page.evaluate(() => document.fonts.ready)
}

export const main = (page) => page.getByRole('main')
export const cartButton = (page) => page.getByRole('button', { name: /^Cart/ })
export const cartRegion = (page) => page.getByRole('region', { name: 'Cart' })
export const gallery = (page) => page.getByRole('dialog', { name: 'Image gallery' })
export const quantity = (page) => page.getByRole('status', { name: 'Quantity' })

export async function increase(page, times) {
  for (let i = 0; i < times; i++) await page.getByRole('button', { name: 'Increase quantity' }).click()
}

export async function addToCart(page, n) {
  await increase(page, n)
  await page.getByRole('button', { name: 'Add to cart' }).click()
}

// Grande photo visible dans `scope` (page ou visionneuse), repérée par son texte alternatif (A7) :
// plus de 200 px, visible, centre dans la fenêtre. Renvoie { n, x, y, width, height } ou null.
export function shownImage(scope) {
  return scope.evaluate((root) => {
    for (const img of root.querySelectorAll('img')) {
      const match = img.alt.match(/^Fall Limited Edition Sneakers, image (\d) of 4$/)
      const b = img.getBoundingClientRect()
      const cx = b.x + b.width / 2
      const cy = b.y + b.height / 2
      if (match && b.width > 200 && img.checkVisibility({ opacityProperty: true, visibilityProperty: true })
        && cx > 0 && cx < innerWidth && cy > 0 && cy < innerHeight) {
        return { n: Number(match[1]), x: Math.round(b.x), y: Math.round(b.y), width: Math.round(b.width), height: Math.round(b.height) }
      }
    }
    return null
  })
}

export const displayedImage = async (scope) => (await shownImage(scope))?.n ?? null

// Vrai si le focus est dans `scope`, ou nulle part (le <dialog> natif laisse passer le focus
// par la barre d'adresse : il ne touche jamais la page derrière).
export const focusStaysIn = (scope) =>
  scope.evaluate((root) => root.contains(document.activeElement) || document.activeElement === document.body)

const REFERENCE = new URL('../specs/reference/', import.meta.url)

// Part des pixels dont un canal diffère de plus de 40 (mesure du calibrage de la Phase 3).
// Avec `clip` { x, y, width, height }, la capture couvre cette zone et on la compare
// à la même zone de la référence.
export function diffRatio(screenshot, referenceFile, clip = null) {
  const actual = PNG.sync.read(screenshot)
  const expected = jpeg.decode(readFileSync(new URL(referenceFile, REFERENCE)), { useTArray: true })
  const area = clip || { x: 0, y: 0, width: expected.width, height: expected.height }
  if (actual.width !== area.width || actual.height !== area.height) {
    throw new Error(`capture ${actual.width}×${actual.height} ≠ zone ${area.width}×${area.height}`)
  }
  let different = 0
  for (let y = 0; y < area.height; y++) {
    for (let x = 0; x < area.width; x++) {
      const a = (y * actual.width + x) * 4
      const e = ((area.y + y) * expected.width + area.x + x) * 4
      const delta = Math.max(
        Math.abs(actual.data[a] - expected.data[e]),
        Math.abs(actual.data[a + 1] - expected.data[e + 1]),
        Math.abs(actual.data[a + 2] - expected.data[e + 2]),
      )
      if (delta > 40) different++
    }
  }
  return different / (area.width * area.height)
}
