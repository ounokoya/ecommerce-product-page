# ADR-0004 : Police Kumbh Sans servie par le paquet `@fontsource/kumbh-sans`

## Statut
Accepté (2026-11-04)

## Contexte
Le starter ne fournit pas les fichiers de Kumbh Sans (graisses 400 et 700). Les tests visuels (S24 à S30) comparent des pixels : un rendu de police qui dépend du réseau rendrait les mesures instables.

## Options
| Option | Pour | Contre |
|---|---|---|
| **`@fontsource/kumbh-sans` (choisie)** | Servie par Vite avec le site, aucune requête externe, tests identiques hors ligne | Une dépendance de plus |
| Lien Google Fonts | Le plus simple | Page et tests dépendent du réseau et de Google ; léger décalage au chargement |
| woff2 + `@font-face` à la main | Contrôle total | Fichiers à tenir à jour soi-même |

## Décision
- `npm i @fontsource/kumbh-sans` (dépendance d'exécution, pas de développement).
- Seules les graisses 400 et 700 sont importées dans `src/style.css`, pas le paquet entier.

## Conséquences
- Vite copie les fichiers woff2 dans `dist/assets/` avec un nom haché ; le site en ligne ne fait aucun appel à un serveur de polices.
- `font-display: swap` (défaut du paquet) ; les tests attendent `document.fonts.ready` avant de mesurer.
- Le README le mentionne dans « Built with ».
