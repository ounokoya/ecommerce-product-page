import { test, expect } from '@playwright/test'
import { open, cartButton, cartRegion, quantity, increase, addToCart } from './helpers.js'

// Spec §5 — quantité et panier, S5 à S13

test.beforeEach(async ({ page }) => {
  await open(page, 1440)
})

test('S5 — « − » ne descend pas sous 0', async ({ page }) => {
  await page.getByRole('button', { name: 'Decrease quantity' }).click()
  await expect(quantity(page)).toHaveText('0')
})

test('S6 — « + » × 3 donne 3', async ({ page }) => {
  await increase(page, 3)
  await expect(quantity(page)).toHaveText('3')
})

test('S7 — ajout avec une quantité 0 : panier vide', async ({ page }) => {
  await page.getByRole('button', { name: 'Add to cart' }).click()

  await expect(cartButton(page)).not.toHaveAccessibleName(/\d/)
  await cartButton(page).click()
  await expect(cartRegion(page)).toContainText('Your cart is empty.')
})

test('S8 — ajout de 3 : le panier compte 3, le sélecteur revient à 0', async ({ page }) => {
  await addToCart(page, 3)

  await expect(cartButton(page)).toHaveAccessibleName(/^Cart\b.*\b3\b/)
  await expect(quantity(page)).toHaveText('0')
})

test('S9 — les quantités s\'additionnent', async ({ page }) => {
  await addToCart(page, 3)
  await addToCart(page, 2)

  await expect(cartButton(page)).toHaveAccessibleName(/^Cart\b.*\b5\b/)
})

test('S10 — le panier affiche le prix unitaire, la quantité et le total', async ({ page }) => {
  await addToCart(page, 3)
  await cartButton(page).click()

  await expect(cartRegion(page)).toContainText('Fall Limited Edition Sneakers')
  await expect(cartRegion(page)).toContainText('$125.00 x 3')
  await expect(cartRegion(page)).toContainText('$375.00')
})

test('S11 — « Delete item » vide le panier', async ({ page }) => {
  await addToCart(page, 3)
  await cartButton(page).click()
  await cartRegion(page).getByRole('button', { name: 'Delete item' }).click()

  await expect(cartRegion(page)).toContainText('Your cart is empty.')
  await expect(cartButton(page)).not.toHaveAccessibleName(/\d/)
})

test('S12 — le panier s\'ouvre et se ferme (2e clic, Échap, clic dehors)', async ({ page }) => {
  const button = cartButton(page)
  await expect(cartRegion(page)).toBeHidden()

  await button.click()
  await expect(cartRegion(page)).toBeVisible()
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await button.click()
  await expect(cartRegion(page)).toBeHidden()
  await expect(button).toHaveAttribute('aria-expanded', 'false')

  await button.click()
  await page.keyboard.press('Escape')
  await expect(cartRegion(page)).toBeHidden()

  await button.click()
  await page.mouse.click(100, 850)
  await expect(cartRegion(page)).toBeHidden()
})

test('S13 — « Checkout » ferme le panier', async ({ page }) => {
  await addToCart(page, 1)
  await cartButton(page).click()
  await cartRegion(page).getByRole('button', { name: 'Checkout' }).click()

  await expect(cartRegion(page)).toBeHidden()
})
