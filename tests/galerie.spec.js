import { test, expect } from '@playwright/test'
import { open, main, gallery, displayedImage, focusStaysIn } from './helpers.js'

// Spec §5 — galerie et visionneuse, S14 à S18

test('S14 — miniature 3 : photo 3 affichée, seule la miniature 3 est marquée', async ({ page }) => {
  await open(page, 1440)
  await main(page).getByRole('button', { name: 'Show image 3' }).click()

  expect(await displayedImage(main(page))).toBe(3)
  for (const n of [1, 2, 3, 4]) {
    await expect(main(page).getByRole('button', { name: `Show image ${n}` })).toHaveAttribute('aria-pressed', n === 3 ? 'true' : 'false')
  }
})

test('S15 — mobile : flèches suivante et précédente, en boucle', async ({ page }) => {
  await open(page, 375)
  await main(page).getByRole('button', { name: 'Next image' }).click()
  expect(await displayedImage(main(page))).toBe(2)

  await main(page).getByRole('button', { name: 'Previous image' }).click()
  await main(page).getByRole('button', { name: 'Previous image' }).click()
  expect(await displayedImage(main(page))).toBe(4)
})

test('S16 — visionneuse : ouverture sur la photo affichée, image suivante, Échap, la page garde l\'image vue', async ({ page }) => {
  await open(page, 1440)
  const trigger = page.getByRole('button', { name: 'Open image gallery' })
  await trigger.click()

  await expect(gallery(page)).toBeVisible()
  expect(await displayedImage(gallery(page))).toBe(1)
  await gallery(page).getByRole('button', { name: 'Next image' }).click()
  expect(await displayedImage(gallery(page))).toBe(2)

  await page.keyboard.press('Escape')
  await expect(gallery(page)).toBeHidden()
  expect(await displayedImage(main(page))).toBe(2)
  await expect(trigger).toBeFocused()
})

test('S17 — visionneuse : flèches du clavier', async ({ page }) => {
  await open(page, 1440)
  await page.getByRole('button', { name: 'Open image gallery' }).click()

  await page.keyboard.press('ArrowRight')
  expect(await displayedImage(gallery(page))).toBe(2)
  await page.keyboard.press('ArrowLeft')
  await page.keyboard.press('ArrowLeft')
  expect(await displayedImage(gallery(page))).toBe(4)
})

test('S18 — visionneuse : le focus reste dans le dialogue', async ({ page }) => {
  await open(page, 1440)
  await page.getByRole('button', { name: 'Open image gallery' }).click()

  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab')
    expect(await focusStaysIn(gallery(page))).toBe(true)
  }
})
