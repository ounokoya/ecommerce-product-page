# ADR-0003 : Tokens Penpot → thème Tailwind (`@theme`)

## Statut
Accepté (2026-11-04)

## Contexte
La bibliothèque Penpot (validée G3, `specs/visuel/penpot/maquette.md`) fixe les couleurs FM, trois couleurs dérivées (décisions Q1 à Q3 de G2) et les tailles de texte mesurées. Décisions communes : ADR-0001, ADR-0002 (`frontmentor/specs/adr/`). Même règle que pour Newsletter : aucune valeur de design écrite à la main hors du thème.

## Décision
- `src/style.css` déclare les tokens dans `@theme` et vide la palette par défaut (`--color-*: initial`).
- Couleurs (noms FM) :

| Penpot | `@theme` |
|---|---|
| Orange, Pale orange | `--color-orange`, `--color-pale-orange` |
| Very dark blue, Dark grayish blue, Grayish blue, Light grayish blue | `--color-very-dark-blue`, `--color-dark-grayish-blue`, `--color-grayish-blue`, `--color-light-grayish-blue` |
| White, Black | `--color-white`, `--color-black` |
| Orange icônes (AA) `#EB6600` (Q3) | `--color-orange-icon` |

- Les dérivées à opacité (Orange 65 % au survol, Black 75 % du fond, White 75 / 50 % des miniatures, filet Grayish blue 30 %) passent par `/65`, `/75`, `/50`, `/30`, pas par de nouvelles couleurs.
- `--font-sans: "Kumbh Sans", sans-serif` (chargement : ADR-0004).
- Tailles de texte, rayons, ombre de la carte du panier : valeurs du tableau « Typographie » de `maquette.md`. Une valeur utilisée à plusieurs endroits devient un token : `--text-nav`, `--text-menu`, `--text-brand` (+ `-mobile`), `--text-title` (+ `-mobile`), `--text-body` (+ `-mobile`), `--text-price`, `--text-label`, `--text-badge` (taille, interligne et espacement), `--radius-control` (10 px), `--radius-photo` (15 px), `--shadow-card`, `--shadow-button`. Une valeur unique reste un utilitaire Tailwind (`rounded-md`, `rounded`).

## Conséquences
- Changer une couleur du design = changer une ligne de `@theme`.
- Fitness function (test « ADR-0003 » de `tests/statique.spec.js`) : aucune couleur (`#…`, `rgb(`, `hsl(`) dans `index.html`, dans `src/*.js`, ni dans `src/style.css` hors du bloc `@theme`.
- Retour FM R1 de Newsletter : un groupe d'utilitaires répété devient un `@utility` nommé.
