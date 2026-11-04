# ADR-0005 : JavaScript en modules, un par fonction de la page

## Statut
Accepté (2026-11-04)

## Contexte
La page a trois comportements indépendants : la quantité et le panier, la galerie (carrousel, miniatures, visionneuse), le menu mobile. En mode « humain guidé », chaque partie est écrite, relue et commitée à part (SDL-FM 1.1.0, Phase 6).

## Options
| Option | Pour | Contre |
|---|---|---|
| **Un module par fonction (choisie)** | Un fichier = une partie = un commit ; relecture ciblée | Quelques imports à câbler |
| Un seul `main.js` | Démarrage immédiat | ≈ 200 lignes mêlées, relectures lourdes |
| État partagé + modules | Pastille et carte toujours d'accord | Plus abstrait qu'il n'en faut pour cette page |

## Décision
- `src/main.js` importe le CSS et lance les modules : `src/cart.js` (quantité + panier), `src/gallery.js` (carrousel, miniatures, visionneuse), `src/menu.js` (menu mobile).
- Chaque module ne lit et ne modifie que sa partie du DOM. L'état du panier vit dans `cart.js`, l'image affichée dans `gallery.js`.
- Si la visionneuse et le menu partagent du code de fenêtre modale (ADR-0006), il va dans un module commun (`src/dialog.js`), pas dans l'un des deux.

## Conséquences
- Tests par partie : `cart.js` → S5 à S13, S26, S28, S29 ; `gallery.js` → S14 à S18, S25 ; `menu.js` → S20, S30.
- Pas de framework ni de dépendance JS.
