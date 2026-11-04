# Maquette Penpot — E-commerce product page

> SDL-FM 1.1.0 Phase 3. Fichier Penpot : « ecommerce-product-page », page « E-commerce ». En attente de validation (G3).
> Décisions G2 appliquées : ancien prix Dark grayish blue (Q1), chiffre de la pastille Very dark blue (Q2), icônes − + `#EB6600` (Q3), tablette (Q4), états non dessinés (Q8).

## Bibliothèque

### Couleurs

| Groupe | Nom | Valeur |
|---|---|---|
| FM | Orange | `#FF7D1A` |
| FM | Pale orange | `#FFEDE0` |
| FM | Very dark blue | `#1D2025` |
| FM | Dark grayish blue | `#68707D` |
| FM | Grayish blue | `#B6BCC8` |
| FM | Light grayish blue | `#F7F8FD` |
| FM | White | `#FFFFFF` |
| FM | Black 75 % | `#000000` à 75 % (fond de la visionneuse et du menu) |
| Dérivées | Orange 65 % (survol) | Orange à 65 % (≈ `#FFAC6A` mesuré sur l'image des états) |
| Dérivées | Orange icônes (AA) | `#EB6600` = `hsl(26, 100%, 46%)` (Q3) |
| Dérivées | Filet | Grayish blue à 30 % |
| Dérivées | White 75 % / White 50 % | voiles des miniatures (active / survol) |

### Typographie (Kumbh Sans, calée sur les largeurs mesurées à ± 2 px)

| Usage | Desktop | Mobile |
|---|---|---|
| Liens du menu | 400, 15 px | 700, 18 px (menu mobile) |
| Marque « SNEAKER COMPANY » | 700, 13 px, espacement 2 px | 700, 12 px, espacement ≈ 1,85 px |
| Titre | 700, 44 / 48 px | 700, 28 / 32 px |
| Description | 400, 16 / 26 px | 400, 15 / 25 px |
| Prix | 700, 28 px | 700, 28 px |
| Étiquette, ancien prix, boutons, quantité, panier | 700, 16 px | idem |
| Pastille du panier | 700, 10 px | idem |

## Composants

| Composant | États |
|---|---|
| Bouton principal | Normal (Orange) · Survol (Orange 65 %) · Focus (contour 2 px Very dark blue) |
| Miniature | Normal · Survol (voile blanc 50 %) · Active (bordure Orange 2 px + voile 75 %) |
| Flèche | Normal · Survol (chevron Orange) |
| Lien du menu | Normal · Survol (texte foncé + barre Orange 4 px) |
| Lien menu mobile | Normal · Survol (texte Orange, Q8) |
| Avatar | Normal · Survol (anneau Orange 2 px) |
| Carte panier | Vide (« Your cart is empty. ») · Rempli (article, total, Checkout) |

## Écrans et seuils visuels (calibrage 1.1.0)

Écart = part des pixels dont un canal diffère de plus de 40 sur 255. Seuil de l'écran pour la Phase 7 = **max(5 %, écart + 1 point)**.

| Écran Penpot | Image FM | Écart | Seuil Phase 7 |
|---|---|---|---|
| Desktop · Page | `desktop.jpg` | 1,11 % | 5,0 % |
| Desktop · Panier vide + survols | `etat-panier-vide-desktop.jpg` | 1,45 % | 5,0 % |
| Desktop · Panier rempli + survols | `etat-panier-rempli-desktop.jpg` | 1,56 % | 5,0 % |
| Desktop · Visionneuse (image 1) | `visionneuse.jpg` | 0,17 % | 5,0 % |
| Mobile · Page | `mobile.jpg` | 4,23 % | **5,2 %** |
| Mobile · Panier vide | `etat-panier-vide-mobile.jpg` | 3,67 % | 5,0 % |
| Mobile · Panier rempli | `etat-panier-rempli-mobile.jpg` | 4,19 % | **5,2 %** |
| Mobile · Menu ouvert | `etat-menu-mobile.jpg` | 0,56 % | 5,0 % |

Écrans sans image FM : Desktop · Panier vide (ouvert), Desktop · Panier rempli (après ajout), Desktop · Page (pastille 3), Desktop · Page (pastille 3, image 2), Desktop · Visionneuse (image 2), Mobile · Page (image 2), **Tablette · Page (proposition Q4)**.

Notes :
- Les images d'états FM sont des **composites** (plusieurs survols à la fois, sélecteur à 3) : les écrans « + survols » les reproduisent pour le calibrage ; Playwright ne peut survoler qu'un élément à la fois, la Phase 7 comparera donc ces écrans sur des zones ciblées (voir spec).
- Les écarts mobiles viennent surtout du lissage du texte en 15 px ; positions à ± 1 px.
- Penpot étire les images par défaut : `keepAspectRatio` activé sur toutes les photos (recadrage centré, comme `object-fit: cover`).

## Prototype (fondu 200 ms)

| Parcours | Enchaînement |
|---|---|
| **Desktop · panier** | Page → clic panier → Panier vide (ouvert) → clic panier → Page ; Page → Add to cart → Panier rempli (après ajout) → Supprimer → Panier vide ; Checkout ou clic panier → Page (pastille 3) |
| **Desktop · visionneuse** | Page (pastille 3) → clic sur la photo → Visionneuse 1 ⇄ Visionneuse 2 (flèches et miniatures) ; Fermer → la page garde la dernière image vue (Q7) |
| **Mobile** | Page → menu → Menu ouvert → Fermer ; Page → panier → Panier vide ; Page → Add to cart → Panier rempli → Supprimer → Panier vide ; flèches → Page (image 2) |

Simplifications : l'ajout suppose une quantité choisie (le calcul ne se simule pas) ; les survols sont dans les composants et les écrans « + survols », pas dans le prototype.

## Fichiers

- `*.png` : exports des 15 écrans.
- `comparaison-*.png` : image FM | maquette | écarts en rouge, pour les 8 écrans calibrés.
- `apercu-maquette.png` : aperçu des écrans principaux.
