import { defineConfig, devices } from '@playwright/test'

// Tests dérivés de la spec (S1 à S30) — ADR-0002 commun
// BASE_URL=https://ounokoya.github.io/ecommerce-product-page/ npm test : vérifie le site en ligne
const LOCAL = 'http://localhost:4180/ecommerce-product-page/'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || LOCAL,
    ...devices['Desktop Chrome'],
  },
  webServer: process.env.BASE_URL ? undefined : {
    command: 'npm run build && npm run preview -- --port 4180 --strictPort',
    url: LOCAL,
    reuseExistingServer: !process.env.CI,
  },
})
