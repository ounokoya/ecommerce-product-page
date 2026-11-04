# Spec — E-commerce product page

> SDL-FM 1.1.0 Phase 4. Sources : analyse validée (G2) `specs/visuel/ecommerce-product-page-analyse.*`, maquette validée (G3) `specs/visuel/penpot/maquette.md`, décisions Q1 à Q9 dans `specs/brainstorming/2026-11-04-ecommerce-product-page.md`.
> Cette spec dit **quoi** et **pourquoi**, jamais **comment**. Le code est écrit par l'humain (mode « humain guidé ») ; les tests de `tests/` vérifient cette spec et servent de cible.

## 1. Objectif

Une page produit de chaussures. Le visiteur parcourt les photos (miniatures, carrousel, visionneuse plein écran), choisit une quantité, l'ajoute au panier, consulte le panier et peut en retirer l'article. La page s'adapte du mobile au desktop et se pilote entièrement au clavier.

## 2. Composants et contenu

| Composant | Contenu |
|---|---|
| En-tête | Logo « sneakers » ; navigation (Collections, Men, Women, About, Contact) ; bouton du panier + pastille ; avatar (lien vers le profil) ; en mobile et tablette, bouton du menu |
| Menu mobile | Panneau avec les 5 liens et un bouton de fermeture, fond assombri |
| Carte du panier | Titre « Cart » ; vide : « Your cart is empty. » ; rempli : miniature, « Fall Limited Edition Sneakers », « $125.00 x N » et le total, bouton de suppression, bouton « Checkout » |
| Galerie | Photo affichée (1 à 4) ; desktop : 4 miniatures, clic sur la photo = visionneuse ; mobile et tablette : flèches précédent / suivant |
| Visionneuse (desktop) | Fond noir 75 %, photo 550 × 550, fermer, flèches, 4 miniatures |
| Fiche produit | « SNEAKER COMPANY », titre « Fall Limited Edition Sneakers », description, prix « $125.00 », remise « 50% », ancien prix « $250.00 » barré |
| Achat | Sélecteur de quantité (−, valeur, +) et bouton « Add to cart » |
| Pied de page | « Challenge by Frontend Mentor. Coded by Koya Esdras. » (liens) |

Assets : `images/` du starter (photos, miniatures, icônes, logo, avatar).

## 3. Tokens

Couleurs, typographie et espacements : `specs/reference/tokens.md` et la bibliothèque Penpot (`maquette.md`). Valeurs dérivées retenues :

| Token | Valeur | Usage |
|---|---|---|
| Ancien prix | Dark grayish blue | Q1 (contraste 5,0:1), toujours barré |
| Chiffre de la pastille | Very dark blue sur Orange | Q2 (6,4:1) |
| Icônes − + | `hsl(26, 100%, 46%)` | Q3 (3,1:1 sur Light grayish blue) |
| Survol des boutons Orange | Orange à 65 % | mesuré sur l'image des états |
| Filet de l'en-tête | Grayish blue à 30 % | |
| Voiles des miniatures | blanc 50 % (survol), 75 % (active) | |

## 4. Responsive

| Largeur | Disposition |
|---|---|
| < 640 px (mobile) | En-tête 67 px : menu, logo, panier, avatar 24 px ; carrousel 375 × 300 pleine largeur (sans rayon) avec flèches de 40 px ; contenu à 24 px des bords ; prix et remise à gauche, ancien prix à droite ; quantité et bouton pleine largeur ; ombre Orange sous le bouton ; carte du panier à 8 px des bords sous l'en-tête |
| 640 – 1023 px (tablette, Q4) | Structure mobile ; photo 550 × 550 arrondie (15 px) et contenu centrés sur 550 px ; quantité et bouton côte à côte |
| ≥ 1024 px (desktop) | Conteneur 1110 px ; en-tête 112 px avec filet ; galerie 445 px (photo 445 × 445 rayon 15, miniatures 88 px) à gauche, colonne texte 445 px à droite (125 px d'écart), centrées verticalement ; carte du panier 360 × 256 sous l'en-tête à droite |

Pas de défilement horizontal de 320 px aux grands écrans.

## 5. États et interactions

| Sujet | Règle |
|---|---|
| Quantité | Entier ≥ 0, part de 0. « − » sans effet à 0. Pas de limite haute. |
| Ajout | « Add to cart » avec une quantité 0 : rien. Sinon la quantité s'**ajoute** à celle du panier et le sélecteur revient à 0 (Q5). |
| Pastille | Nombre total d'articles ; absente si le panier est vide. |
| Panier | S'ouvre et se ferme au clic sur le bouton du panier (Q6) ; se ferme aussi par Échap, par un clic hors de la carte et par « Checkout ». |
| Suppression | Le bouton de suppression vide le panier (un seul produit). |
| Galerie | Une seule photo affichée. Miniatures (desktop) et flèches (mobile, tablette) la changent ; les flèches bouclent (4 → 1, 1 → 4). |
| Visionneuse | Desktop seulement. S'ouvre sur la photo affichée ; flèches, miniatures et touches ← → changent la photo ; Échap, le bouton de fermeture ou un clic sur le fond la ferment ; à la fermeture la page affiche la dernière photo vue (Q7) et le focus revient au déclencheur. |
| Menu mobile | S'ouvre par le bouton du menu ; se ferme par le bouton de fermeture, Échap ou un clic sur le fond ; le focus reste dans le panneau tant qu'il est ouvert et revient au bouton du menu à la fermeture. |
| Survols et focus | Voir l'inventaire de l'analyse (19 groupes). Tout élément interactif a un état de survol et un **contour de focus de 2 px** (jamais la couleur seule). |
| Animations | Courtes (≈ 200 ms) ; aucune avec `prefers-reduced-motion: reduce`. |

## 6. Accessibilité

### Contrats

| # | Contrat |
|---|---|
| A1 | Visionneuse : fenêtre modale (rôle `dialog`) ; le focus y reste ; Échap la ferme ; le focus revient au déclencheur. |
| A2 | Menu mobile : même comportement que A1. |
| A3 | Bouton du panier et bouton du menu indiquent leur état ouvert / fermé (`aria-expanded`). |
| A4 | Le nombre d'articles fait partie du nom du bouton du panier (ex. « Cart, 3 items »). |
| A5 | Ajouts et suppressions sont annoncés aux lecteurs d'écran ; la valeur de la quantité est lisible. |
| A6 | Miniatures : boutons nommés ; la miniature de la photo affichée est marquée (`aria-pressed="true"`). |
| A7 | Photos produit : texte alternatif « Fall Limited Edition Sneakers, image N of 4 » ; icônes décoratives ignorées. |
| A8 | Textes à 4,5:1 au moins, icônes nécessaires à 3:1 (décisions Q1 à Q3). |
| A9 | Contour de focus visible de 2 px sur tous les éléments interactifs. |

### Noms accessibles utilisés par les tests

| Élément | Rôle | Nom |
|---|---|---|
| Bouton du menu (< 1024 px) | button | « Open menu » |
| Fermer le menu | button | « Close menu » |
| Navigation | navigation | « Main » |
| Liens | link | « Collections », « Men », « Women », « About », « Contact » |
| Bouton du panier | button | commence par « Cart » ; contient le nombre quand le panier n'est pas vide |
| Carte du panier | region | « Cart » |
| Supprimer | button | « Delete item » |
| Checkout | button | « Checkout » |
| Avatar | link | « Your profile » |
| Photo affichée (desktop) | button | « Open image gallery » |
| Flèches | button | « Previous image », « Next image » |
| Miniatures | button | « Show image 1 » … « Show image 4 » |
| Visionneuse | dialog | « Image gallery » |
| Fermer la visionneuse | button | « Close gallery » |
| Quantité | button | « Decrease quantity », « Increase quantity » |
| Valeur de la quantité | status | « Quantity » (texte = le nombre) |
| Ajouter | button | « Add to cart » |

## 7. Critères d'acceptation

```
— Mise en page
S1  Given 375 px      Then « Open menu » visible, liens du menu cachés, photo 375 × 300 en y = 67, flèches visibles, miniatures cachées
S2  Given 768 px      Then photo 550 px de large centrée, arrondie ; « Open menu » visible ; pas de visionneuse
S3  Given 1440 × 900  Then liens visibles, photo 445 × 445 en (213, 203), 4 miniatures, titre en x = 783
S4  Given 320, 640, 1023, 1024 px  Then pas de défilement horizontal

— Quantité et panier
S5  Given quantité 0             When « Decrease quantity »         Then 0
S6  Given quantité 0             When « Increase quantity » × 3     Then 3
S7  Given quantité 0             When « Add to cart »               Then panier vide, pas de nombre sur le bouton du panier
S8  Given quantité 3             When « Add to cart »               Then bouton du panier « Cart… 3… », quantité revenue à 0
S9  Given 3 au panier, quantité 2  When « Add to cart »             Then « …5… » (les quantités s'additionnent)
S10 Given 3 au panier            When j'ouvre le panier             Then « $125.00 x 3 » et « $375.00 »
S11 Given panier ouvert rempli   When « Delete item »               Then « Your cart is empty. », plus de nombre
S12 Given panier fermé           When clic sur le panier            Then région « Cart » visible, aria-expanded="true" ; 2e clic, Échap ou clic dehors → fermée
S13 Given panier ouvert rempli   When « Checkout »                  Then panier fermé

— Galerie et visionneuse
S14 Given 1440 px                When « Show image 3 »              Then photo 3 affichée, seule la miniature 3 a aria-pressed="true"
S15 Given 375 px, image 1        When « Next image » / « Previous image »  Then image 2 / image 4 (boucle)
S16 Given 1440 px                When « Open image gallery », « Next image », Échap  Then dialogue « Image gallery » ouvert sur l'image 1, puis 2 ; fermé ; la page affiche l'image 2 ; focus sur « Open image gallery »
S17 Given visionneuse ouverte    When ← / →                         Then image précédente / suivante
S18 Given visionneuse ouverte    When Tab × 12                      Then le focus reste dans le dialogue
S19 Given 768 px                 Then « Open image gallery » absent (pas de visionneuse)

— Menu mobile
S20 Given 375 px                 When « Open menu », Tab × 8, Échap  Then liens visibles, focus resté dans le panneau ; menu fermé, focus sur « Open menu »

— Focus, accessibilité, HTML
S21 Given 1440 px                When je parcours la page au Tab    Then chaque élément focalisé a un contour de 2 px au moins
S22 Given page, panier ouvert, visionneuse (1440) ; page, menu (375)  Then axe-core : aucune violation sérieuse ou critique
S23 Given le HTML construit      Then validateur W3C Nu : aucune erreur

— Rendu (seuils calibrés en Phase 3)
S24 1440 × 900 page                         vs desktop.jpg                    ≤ 5,0 %
S25 1440 × 900 visionneuse (3 au panier)    vs visionneuse.jpg                ≤ 5,0 %
S26 1440 × 900 carte du panier vide / pleine (zone 991, 94, 360 × 256)  vs états FM  ≤ 5,0 %
S27 375 × 900 page                          vs mobile.jpg                     ≤ 5,2 %
S28 375 × 900 panier vide (quantité 3)      vs etat-panier-vide-mobile.jpg    ≤ 5,0 %
S29 375 × 900 panier rempli (3 ajoutés)     vs etat-panier-rempli-mobile.jpg  ≤ 5,2 %
S30 375 × 900 menu ouvert (3 au panier)     vs etat-menu-mobile.jpg           ≤ 5,0 %
```

Écarts acceptés d'avance : le sélecteur revient à 0 après l'ajout (Q5) alors que l'image FM montre 3 ; les images FM d'états desktop sont des composites, d'où la comparaison sur la seule zone du panier (S26).
