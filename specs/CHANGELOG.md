# Changelog

Format : [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/) · Versions : [SemVer](https://semver.org/lang/fr/).

## [1.0.2] — 2026-11-05

Règles des vérifications automatiques de FM vérifiées en local (SDL-FM 1.5.0), avant la prochaine regénération du rapport.

### Fixed
- La navigation du menu mobile est nommée « Mobile » : deux repères `<nav>` portaient le même nom (`unique-landmark`).
- `tests/mise-en-page.spec.js` : variable inutilisée retirée (`no-unused-vars`).

### Added
- Tests de garde « Règles FM » : html-validate et eslint.

## [1.0.1] — 2026-11-05

Correctifs issus du rapport Frontend Mentor (`specs/analyse/2026-11-05-rapport-fm.md`, 9,4/10).

### Changed
- `cart.js` garde ses références aux éléments du panier au lieu de les rechercher à chaque mise à jour (R1).

### Fixed
- Le README donne le lien de la solution Frontend Mentor au lieu d'un texte provisoire (R3).

## [1.0.0] — 2026-11-04

Première version.

### Added
- En-tête : logo, navigation, bouton du panier avec pastille, avatar ; menu mobile en `<dialog>` (bouton, Échap, fond, liens).
- Galerie : photo affichée, 4 miniatures (desktop), flèches en boucle (mobile et tablette).
- Visionneuse desktop en `<dialog>` : ouverte sur la photo affichée, flèches, miniatures, touches ← →, fermeture par Échap, bouton ou fond ; la page garde la dernière photo vue.
- Quantité (jamais sous 0) et ajout au panier : quantités additionnées, sélecteur remis à 0, pastille et nom du bouton « Cart, N items ».
- Carte du panier : vide ou remplie (prix unitaire, quantité, total), suppression, « Checkout » ; fermeture par 2ᵉ clic, Échap ou clic dehors.
- Mises en page mobile (< 640 px), tablette (640–1023 px, proposition faute de maquette FM) et desktop (≥ 1024 px).
- États de survol, contour de focus de 2 px partout, transitions de 200 ms coupées avec `prefers-reduced-motion`.
- Accessibilité : noms accessibles, `aria-expanded`, `aria-pressed`, annonces `aria-live`, contrastes AA (ancien prix, chiffre de la pastille, icônes − + et suppression plus foncés que la maquette FM).
- Police Kumbh Sans servie avec le site (Fontsource), aucune requête vers un autre domaine.
- 40 tests automatiques (Playwright, axe-core, W3C Nu) écrits depuis la spec avant le code.
- Déploiement sur GitHub Pages depuis la branche `gh-pages` (`npm run deploy`).

### Known issues
- Mobile : Kumbh Sans rendue ≈ 3 % plus large par le navigateur que dans l'image FM ; une ligne de la description se coupe ailleurs (page mobile à 4,11 % de pixels différents, seuil 5,2 %).
