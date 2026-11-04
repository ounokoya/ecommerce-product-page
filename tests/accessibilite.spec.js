import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { open, cartButton, addToCart } from './helpers.js'

// Spec §6 — S21 (contour de focus) et S22 (axe-core)

test('S21 — chaque élément focalisé au clavier a un contour de 2 px au moins', async ({ page }) => {
  await open(page, 1440)
  const seen = new Set()
  for (let i = 0; i < 40; i++) {
    await page.keyboard.press('Tab')
    const info = await page.evaluate(() => {
      const el = document.activeElement
      if (!el || el === document.body) return null
      const s = getComputedStyle(el)
      const label = (el.getAttribute('aria-label') || el.textContent || el.tagName).trim().slice(0, 40)
      return { label, outline: s.outlineStyle !== 'none' ? parseFloat(s.outlineWidth) : 0, shadow: s.boxShadow }
    })
    if (!info || seen.has(info.label)) continue
    seen.add(info.label)
    expect.soft(info.outline >= 2 || info.shadow !== 'none', `focus visible sur « ${info.label} »`).toBe(true)
  }
  expect(seen.size).toBeGreaterThan(10)
})

const states = {
  'page 1440': async (page) => open(page, 1440),
  'panier ouvert 1440': async (page) => { await open(page, 1440); await addToCart(page, 3); await cartButton(page).click() },
  'visionneuse 1440': async (page) => { await open(page, 1440); await page.getByRole('button', { name: 'Open image gallery' }).click() },
  'page 375': async (page) => open(page, 375),
  'menu 375': async (page) => { await open(page, 375); await page.getByRole('button', { name: 'Open menu' }).click() },
}

for (const [name, reach] of Object.entries(states)) {
  test(`S22 — axe-core : ${name}`, async ({ page }) => {
    await reach(page)
    const { violations } = await new AxeBuilder({ page }).analyze()
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact))
    expect(serious.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual([])
  })
}
