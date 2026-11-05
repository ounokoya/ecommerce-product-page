import { test, expect } from '@playwright/test'
import { open, main, shownImage } from './helpers.js'

// Spec §4 — S1 à S4 et S19

const photoBox = async (page) => {
  const box = { ...(await shownImage(main(page))) }
  delete box.n // numéro de la photo : seules les dimensions comptent ici
  return box
}

test('S1 — 375 px : menu mobile, photo 375 × 300 sous l\'en-tête, flèches, pas de miniatures', async ({ page }) => {
  await open(page, 375)

  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Collections' })).toBeHidden()
  expect(await photoBox(page)).toEqual({ x: 0, y: 67, width: 375, height: 300 })
  await expect(main(page).getByRole('button', { name: 'Next image' })).toBeVisible()
  await expect(main(page).getByRole('button', { name: 'Show image 1' })).toBeHidden()
})

test('S2 — 768 px : photo de 550 px centrée, menu mobile', async ({ page }) => {
  await open(page, 768, 1100)
  const box = await photoBox(page)

  expect(box.width).toBe(550)
  expect(box.x).toBe((768 - 550) / 2)
  await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
})

test('S3 — 1440 × 900 : menu, photo 445 × 445 en (213, 203), 4 miniatures, titre en x = 783', async ({ page }) => {
  await open(page, 1440)

  await expect(page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'Collections' })).toBeVisible()
  expect(await photoBox(page)).toEqual({ x: 213, y: 203, width: 445, height: 445 })
  for (const n of [1, 2, 3, 4]) await expect(main(page).getByRole('button', { name: `Show image ${n}` })).toBeVisible()
  const title = await page.getByRole('heading', { level: 1 }).boundingBox()
  expect(Math.round(title.x)).toBe(783)
})

for (const width of [320, 640, 1023, 1024]) {
  test(`S4 — ${width} px : pas de défilement horizontal`, async ({ page }) => {
    await open(page, width)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBe(0)
  })
}

test('S19 — visionneuse sur desktop seulement : présente à 1440 px, absente à 768 px', async ({ page }) => {
  await open(page, 1440)
  await expect(page.getByRole('button', { name: 'Open image gallery' })).toBeVisible()
  await page.setViewportSize({ width: 768, height: 1100 })
  await expect(page.getByRole('button', { name: 'Open image gallery' })).toBeHidden()
})
