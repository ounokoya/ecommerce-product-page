# ADR-0006 : Visionneuse et menu mobile en `<dialog>` natif (`showModal()`)

## Statut
Accepté (2026-11-04)

## Contexte
Contrats A1 et A2 de la spec : fenêtre modale, focus gardé dedans, Échap ferme, focus rendu au déclencheur. Fond noir à 75 % (maquette).

## Options
| Option | Pour | Contre |
|---|---|---|
| **`<dialog>` + `showModal()` (choisie)** | Échap, fond inactif (`inert`), couche supérieure et `::backdrop` fournis par le navigateur | Fermeture au clic sur le fond à coder ; le focus peut sortir vers la barre d'adresse (comportement natif accepté par les tests) |
| `div role="dialog"` faite main | Tout est maîtrisé | Piège du focus, Échap et fond inactif à coder, donc plus de risques d'accessibilité |

## Décision
- Deux `<dialog>` : la visionneuse (nom « Image gallery », ouverte seulement à partir de 1024 px) et le menu mobile (en dessous de 1024 px).
- Ouverture par `showModal()`, fond par `::backdrop` (Black 75 %).
- Le JS ajoute ce que le navigateur ne fait pas : fermer au clic sur le fond et, pour la visionneuse, synchroniser l'image vue avec la page à la fermeture (Q7).

## Conséquences
- À la fermeture, le navigateur rend le focus à l'élément qui l'avait ; S16 et S20 le vérifient.
- Animations d'ouverture (≈ 200 ms) coupées sous `prefers-reduced-motion: reduce`.
- **Point de structure laissé à ton choix (Phase 6, HTML)** : un `<dialog>` fermé est en `display: none`. Pour les liens du menu, tu peux soit les avoir deux fois (navigation desktop dans l'en-tête, copie dans le `<dialog>`), soit garder une seule liste que le JS déplace. Les tests marchent dans les deux cas, tant qu'une seule liste est visible à la fois.
