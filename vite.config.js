import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// base : le site est servi par GitHub Pages sous /ecommerce-product-page/
export default defineConfig({
  base: '/ecommerce-product-page/',
  plugins: [tailwindcss()],
})
