import { test, expect } from '@playwright/test'
import { open, cartButton, increase, addToCart, diffRatio } from './helpers.js'

// Spec §7 — S24 à S30 : seuils calibrés en Phase 3 (specs/visuel/penpot/maquette.md)

const CART_ZONE = { x: 991, y: 94, width: 360, height: 256 }

const screens = [
  { id: 'S24', name: 'page desktop', size: 1440, ref: 'desktop.jpg', max: 0.05, reach: async () => {} },
  {
    id: 'S25', name: 'visionneuse (3 au panier)', size: 1440, ref: 'visionneuse.jpg', max: 0.05,
    reach: async (page) => { await addToCart(page, 3); await page.getByRole('button', { name: 'Open image gallery' }).click() },
  },
  {
    id: 'S26a', name: 'carte du panier vide (zone)', size: 1440, ref: 'etat-panier-vide-desktop.jpg', max: 0.05, clip: CART_ZONE,
    reach: async (page) => { await cartButton(page).click() },
  },
  {
    id: 'S26b', name: 'carte du panier rempli (zone)', size: 1440, ref: 'etat-panier-rempli-desktop.jpg', max: 0.05, clip: CART_ZONE,
    reach: async (page) => { await addToCart(page, 3); await cartButton(page).click() },
  },
  { id: 'S27', name: 'page mobile', size: 375, ref: 'mobile.jpg', max: 0.052, reach: async () => {} },
  {
    id: 'S28', name: 'panier vide mobile (quantité 3)', size: 375, ref: 'etat-panier-vide-mobile.jpg', max: 0.05,
    reach: async (page) => { await increase(page, 3); await cartButton(page).click() },
  },
  {
    id: 'S29', name: 'panier rempli mobile', size: 375, ref: 'etat-panier-rempli-mobile.jpg', max: 0.052,
    reach: async (page) => { await addToCart(page, 3); await cartButton(page).click() },
  },
  {
    id: 'S30', name: 'menu mobile (3 au panier)', size: 375, ref: 'etat-menu-mobile.jpg', max: 0.05,
    reach: async (page) => { await addToCart(page, 3); await page.getByRole('button', { name: 'Open menu' }).click() },
  },
]

for (const { id, name, size, ref, max, clip, reach } of screens) {
  test(`${id} — ${name} proche de ${ref} (≤ ${(max * 100).toFixed(1)} %)`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await open(page, size, 900)
    await reach(page)
    await page.mouse.move(0, 0) // aucun survol pendant la capture

    const shot = await page.screenshot({ caret: 'hide', animations: 'disabled', ...(clip ? { clip } : {}) })
    await testInfo.attach(`${id}.png`, { body: shot, contentType: 'image/png' })
    const ratio = diffRatio(shot, ref, clip)
    testInfo.annotations.push({ type: 'pixels différents', description: `${(ratio * 100).toFixed(2)} %` })
    expect(ratio).toBeLessThanOrEqual(max)
  })
}
