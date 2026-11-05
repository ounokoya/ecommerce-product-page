# Soumission Frontend Mentor

> SDL-FM Phase 13. Textes préparés pour le formulaire « Submit solution » du challenge. La soumission est publique et faite au nom de l'humain : elle n'est envoyée qu'avec son accord.
>
> **Envoyée le 2026-11-05** avec l'accord de l'humain, textes ci-dessous inchangés : https://www.frontendmentor.io/solutions/e-commerce-product-page-with-tailwind-v4-native-dialog-and-playwright-Ll7Dgb9LKU

## Informations générales

| Champ | Valeur |
|---|---|
| Solution title (70 caractères max) | E-commerce product page with Tailwind v4, native dialog & Playwright |
| Repository URL | https://github.com/ounokoya/ecommerce-product-page |
| Live site URL | https://ounokoya.github.io/ecommerce-product-page/ |
| Tags (5 max, hors HTML/CSS/JS) | `tailwind-css`, `vite`, `accessibility`, `playwright` (si le tag existe) |
| Visibilité | Public |

FM précise que la soumission déclenche une code review IA (le 2ᵉ rapport gratuit du mois).

## What are you most proud of, and what would you do differently next time?

I'm most proud of writing the 40 tests before the code. After measuring the designs in Excalidraw and rebuilding them in Penpot, I turned the spec into Playwright tests that only use roles and accessible names. They became the target for the code: behaviour, axe-core, the W3C validator and a pixel comparison with each design JPG (0.5–4.8 % difference). All 40 also pass on the live site.

Next time, I'd decide at the very start who writes the code. I planned to code it myself with AI as a tutor, then we switched to the AI writing it from my validated spec and choices; the README explains it. I'd also check the contrast of every icon during the design analysis: I only caught the delete icon (1.6:1) while coding.

## What challenges did you encounter, and how did you overcome them?

- **Contrast**: four design colours were below WCAG. I darkened the old price, the cart badge digit, the − / + icons (`hsl(26, 100%, 46%)`, 3.1:1) and the delete icon, and kept the rest of the palette.
- **Lightbox and page in sync**: both galleries render from one `current` index, so closing the lightbox keeps the last image viewed, with no syncing code.
- **Modals**: I used the native `<dialog>` with `showModal()` for the lightbox and the mobile menu (Escape, inert background and focus return for free), and only added the click on the backdrop.
- **No tablet design**: I proposed a centred 550 px layout in the Penpot mockup and validated it before coding.
- **A test that passed locally but failed online**: it read the lightbox image during the 200 ms fade-in. It now waits for the image (`expect.poll`).

## What specific areas of your project would you like help with?

1. The mobile menu is a `<dialog>`, so its links are a second copy of the header navigation. Would you rather keep one list and change its layout, or is the duplicate fine?
2. The cart button's accessible name includes the count ("Cart, 3 items") and a polite live region announces adds and removes. Is that the right combination, or is one of them redundant?
3. All four photos are in the HTML and toggled with `hidden`, loaded upfront to avoid a blank flash when switching. Would you load them differently to save bandwidth?
