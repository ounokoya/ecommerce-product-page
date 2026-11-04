# ADR-0007 : Carte du panier = bouton `aria-expanded` + région gérée en JS

## Statut
Accepté (2026-11-04)

## Contexte
La carte du panier s'ouvre sous le bouton, sans être modale : la page reste utilisable. Spec Q6 : 2e clic, Échap, clic dehors ou « Checkout » la ferment. Contrats A3 à A5.

## Options
| Option | Pour | Contre |
|---|---|---|
| **Bouton `aria-expanded` + JS (choisie)** | Colle à S12 ; placement CSS classique | 2e clic, Échap et clic dehors à coder |
| API Popover | Fermeture légère fournie | `aria-expanded` à synchroniser à la main pour S12 ; placement sous le bouton moins simple |

## Décision
- Le bouton du panier porte `aria-expanded` et `aria-controls` ; son nom commence par « Cart » et contient le nombre d'articles quand le panier n'est pas vide (A4).
- La carte est une région nommée « Cart », cachée par l'attribut `hidden` quand elle est fermée.
- `cart.js` gère l'ouverture et la fermeture (bouton, Échap, clic hors de la carte et du bouton, « Checkout »). Après Échap, le focus revient au bouton.
- Les ajouts et suppressions sont annoncés par une zone `aria-live="polite"` (A5) ; le texte de l'annonce est à ton choix.

## Conséquences
- Placement : sous le bouton en desktop (zone 991, 94, 360 × 256 dans S26) ; en mobile, carte large sous l'en-tête (S28, S29).
- La pastille et le nom du bouton sont mis à jour par la même fonction que la carte : ils ne peuvent pas diverger.
