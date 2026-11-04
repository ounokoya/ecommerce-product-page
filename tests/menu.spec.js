import { test, expect } from '@playwright/test'
import { open } from './helpers.js'

// Spec §5 et A2 — menu mobile, S20

const INSIDE = ['Close menu', 'Collections', 'Men', 'Women', 'About', 'Contact']

test('S20 — menu mobile : ouverture, focus gardé dans le panneau, Échap', async ({ page }) => {
  await open(page, 375)
  const trigger = page.getByRole('button', { name: 'Open menu' })
  await trigger.click()

  await expect(page.getByRole('button', { name: 'Close menu' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Collections' })).toBeVisible()
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press('Tab')
    // body = focus parti dans la barre d'adresse (<dialog> natif) : il ne touche pas la page derrière
    const name = await page.evaluate(() => {
      const el = document.activeElement
      return el === document.body ? null : (el.getAttribute('aria-label') || el.textContent || '').trim()
    })
    if (name !== null) expect(INSIDE).toContain(name)
  }

  await page.keyboard.press('Escape')
  await expect(page.getByRole('link', { name: 'Collections' })).toBeHidden()
  await expect(trigger).toBeFocused()
})
