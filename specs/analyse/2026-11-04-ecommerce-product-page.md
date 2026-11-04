# 2026-11-04 — Rapport d'exécution : E-commerce product page

> SDL-FM Phases 7 et 8. Tests sur le build de production (`vite build` + `vite preview`), parcours réel dans le navigateur intégré (serveur de développement).

## 1. Tests automatiques (Phase 7)

`npm test` : **40 réussis sur 40** (6,1 s).

| Groupe | Scénarios | Résultat |
|---|---|---|
| Mise en page | S1 à S4 (320, 640, 1023, 1024 px), S19 | ✅ 8 / 8 |
| Quantité et panier | S5 à S13 | ✅ 9 / 9 |
| Galerie et visionneuse | S14 à S18 | ✅ 5 / 5 |
| Menu mobile | S20 | ✅ 1 / 1 |
| Focus et axe-core | S21 ; S22 : page, panier ouvert, visionneuse (1440), page, menu (375) | ✅ 6 / 6, aucune violation sérieuse ou critique |
| HTML (W3C Nu, local) | S23 | ✅ aucune erreur |
| Fitness ADR-0003 et ADR-0004 | aucune couleur hors `@theme` ; rien hors du domaine, Kumbh Sans 400 et 700 | ✅ 2 / 2 |
| Visuel | S24 à S30, seuils calibrés en Phase 3 | ✅ 8 / 8 |

### Comparaison visuelle

| Écran | Image FM | Pixels différents | Seuil | Penpot (Phase 3) |
|---|---|---|---|---|
| Page desktop 1440 × 900 | `desktop.jpg` | 1,67 % | 5,0 % | 1,11 % |
| Visionneuse (3 au panier) | `visionneuse.jpg` | 0,47 % | 5,0 % | 0,17 % |
| Carte du panier vide (zone) | `etat-panier-vide-desktop.jpg` | 1,01 % | 5,0 % | — |
| Carte du panier rempli (zone) | `etat-panier-rempli-desktop.jpg` | 3,41 % | 5,0 % | — |
| Page mobile 375 × 900 | `mobile.jpg` | 4,11 % | 5,2 % | 4,23 % |
| Panier vide mobile (quantité 3) | `etat-panier-vide-mobile.jpg` | 4,11 % | 5,0 % | 3,67 % |
| Panier rempli mobile | `etat-panier-rempli-mobile.jpg` | 4,75 % | 5,2 % | 4,19 % |
| Menu mobile (3 au panier) | `etat-menu-mobile.jpg` | 1,40 % | 5,0 % | 0,56 % |

## 2. Parcours réel (Phase 8)

| Étape du plan | 375 px | 768 px | 1440 px |
|---|---|---|---|
| Disposition | ✅ carrousel pleine largeur, menu ☰ | ✅ photo 550 arrondie et contenu centrés (Q4) | ✅ deux colonnes, 4 miniatures |
| Galerie | ✅ flèche suivante → image 2 | ✅ (tests S2, S15) | ✅ miniature 3 → photo 3, miniature marquée |
| Visionneuse | — (absente, S19) | — (absente) | ✅ ouverte sur la photo affichée, ← → , fermée par Échap et par un clic sur le fond ; la page garde la dernière photo vue (Q7) ; focus rendu à la photo |
| Panier | ✅ (tests S28, S29) | — | ✅ + × 3, ajout → « Cart, 3 items » et pastille 3, carte « $125.00 x 3 $375.00 », suppression → « Your cart is empty. », annonce lue, focus sur le bouton du panier |
| Menu mobile | ✅ ouvert, Tab × 7 reste dans le panneau, Échap → fermé, focus sur « Open menu », `aria-expanded` repassé à `false` | ✅ (même composant) | — |
| Survols et focus | — | — | ✅ barre Orange sous le lien, voile sur la miniature, bouton Orange 65 %, contour 2 px au clavier |

## 3. Écarts relevés et suites

| # | Écart | Suite |
|---|---|---|
| E1 | Au premier affichage d'une photo, zone blanche le temps du chargement (`loading="lazy"` sur des images cachées) | Corrigé : photos chargées dès l'ouverture (commit `fix:`) ; tests rejoués 40 / 40 |
| E2 | Mobile : le navigateur dessine Kumbh Sans ≈ 3 % plus large que l'image FM ; une ligne de la description se coupe ailleurs | Accepté : on ne resserre pas l'espacement des lettres pour coller à une image ; écart sous le seuil (4,11 %) |
| E3 | Icône de suppression plus foncée que l'image FM (Q10) | Validé par l'humain le 2026-11-04 |
