# 2026-11-04 — Exploration : E-commerce product page

> SDL-FM 1.1.0, Phase 0 — trace de l'exploration (Pré-dev 1) et du plan validé (Pré-dev 2, G1).

## Contexte

- Profil FM `@ounokoya` : niveau 2, 95 points (Newsletter sign-up form soumis, rapport IA 8,9/10).
- Objectif : **niveau 3**, qui demande de soumettre un challenge **Intermediate**.
- Deuxième challenge mené avec SDL-FM, premier en version 1.1.0.

## Options envisagées

| Challenge | Pour | Contre |
|---|---|---|
| **E-commerce product page** | Beaucoup d'états (galerie, visionneuse, panier, menu mobile) : l'analyse et le prototype Penpot servent pleinement ; gestes d'accessibilité utiles (fenêtre modale, menu, carrousel) ; pas d'API | Taille moyenne à grande |
| Todo app | Plus petit, thème clair/sombre | Moins d'états visuels |
| Interactive comments section | Logique de données riche | Penpot peu utile (ajout, modification, suppression non simulables) |
| IP Address Tracker | API et carte | Clé d'API (création de compte par l'humain) |

**Décision** : E-commerce product page.

## Mode de code (nouveauté 1.1.0)

**Humain guidé** : l'humain écrit le HTML, le CSS et le JS ; l'agent explique, présente les options avec leurs compromis, relit et lance les tests, sans écrire la solution. L'agent suit l'esprit de l'`AGENTS.md` du starter (niveau Intermediate : « collègue expérimenté », options et compromis, l'humain décide). Conséquences retenues au plan :
- les tests sont écrits par l'agent **juste après la spec**, avant le code : ils servent de cible ;
- l'humain commite son code en son nom ; les commits de l'agent (specs, tests) gardent la mention de Claude en co-auteur.

## Points flous du design et réponses retenues

1. **Liens du menu** : liens vers `#` (pas d'autres pages) ; au survol, barre orange sous le lien si le starter la montre.
2. **Quantité à 0 + « Add to cart »** : rien n'est ajouté ; la quantité ne descend jamais sous 0.
3. **Après un ajout** : les quantités s'additionnent dans le panier ; le sélecteur revient à 0.
4. **Pastille du panier** : nombre total d'articles, masquée quand le panier est vide.
5. **« Checkout »** : ferme le panier, sans autre effet (le brief ne lui donne aucun rôle).
6. **Visionneuse** : à partir de 1024 px seulement ; en dessous, carrousel à flèches. Échap la ferme, les flèches du clavier changent de photo, le focus reste dedans et revient sur la photo à la fermeture.
7. **Menu mobile** : panneau depuis la gauche avec fond assombri ; Échap le ferme ; focus gardé dedans.
8. **Avatar** : cercle orange au survol ; lien « Your profile » vers `#`.
9. **Tablette** : pas de maquette ; largeur de bascule fixée dans l'analyse Excalidraw.
10. **Sauvegarde du panier** dans le navigateur : non (pas demandée).

## Prérequis vérifiés (Pré-dev 2)

| Outil | État |
|---|---|
| GitHub CLI | Connecté (`ounokoya`), droits `repo` sans `workflow` → déploiement par `gh-pages` |
| Java 21, navigateur Playwright | OK |
| Canvas Excalidraw | Serveur lancé |
| Plugin Penpot | **Non connecté** : à connecter avant la Phase 3 et à garder ouvert jusqu'à la fin |
| Rapport IA FM | Dernier rapport gratuit du mois, utilisé par cette soumission |

## Plan validé (G1)

| Phase | Livrable |
|---|---|
| 0 · Import & init | Starter (consignes IA rangées), git + Vite + Tailwind v4, ce fichier |
| 1 · Référence | `specs/reference/` : images + `tokens.md` |
| 2 · Analyse Excalidraw ✋ | Mesures, **inventaire de tous les éléments interactifs** et de leurs états, contrastes, focus |
| 3 · Maquette Penpot ✋ | Composants, écrans 375 / 768 (proposition) / 1440, panier vide et rempli, visionneuse, menu mobile, prototype, **seuils visuels par écran** |
| 4 · Spec, puis tests | Spec Given/When/Then, tests Playwright écrits aussitôt (cible pour le code) |
| 5 · ADR | Décisions techniques présentées en options ; l'humain choisit |
| 🔒 | Verrou code |
| 6 · Build (humain) | Un commit par partie : structure HTML, styles mobile, styles desktop, galerie, visionneuse, panier, menu ; relecture par l'agent sur demande |
| 7 · Validate, 8 · Execute | Tests, parcours réel, rapport |
| 9 à 12 | README (« AI Collaboration » : mode tuteur), v1.0.0, push, `gh-pages`, tests rejoués en ligne |
| 13 · Soumettre | Brouillon, envoi avec l'accord de l'humain, rapport trié |

### Scénario de vérification (375, 768, 1440 px)

- Galerie : miniature → grande photo ; ≥ 1024 px : clic sur la photo → visionneuse (flèches, Échap, focus gardé) ; mobile : carrousel à flèches.
- Panier : quantité − / + (jamais sous 0), ajout → pastille, ouverture du panier, suppression → « Your cart is empty ».
- Menu mobile : ouverture, fermeture, Échap.
- Survol et focus sur chaque élément interactif ; parcours complet au clavier.
- Attendu : chaque écran sous son seuil calibré en Phase 3 ; aucune violation axe sérieuse ou critique ; aucune erreur W3C ; tous les scénarios au vert.

## Notes d'import (Phase 0)

- 10 images de design : `desktop-design`, `desktop-design-lightbox`, `active-states-basket-empty`, `active-states-basket-filled`, `active-states-lightbox` (1440 × 900), `desktop-preview` (1440 × 1056), `mobile-design`, `mobile-design-basket-empty`, `mobile-design-basket-filled`, `mobile-menu` (375 × 900).
- **Pas de polices locales** dans ce starter (Kumbh Sans via Google Fonts) : le choix du chargement de la police sera une décision de Phase 5.
- Le `.gitignore` du starter n'ignorait pas `node_modules` : complété.
- `AGENTS.md` et `CLAUDE.md` rangés dans `specs/reference/starter-*.md`.

## Validation G2 — analyse Excalidraw (2026-11-04)

Analyse validée telle quelle (`specs/visuel/ecommerce-product-page-analyse.*`). Décisions retenues :

| # | Sujet | Décision |
|---|---|---|
| Q1 | Ancien prix à 1,9:1 | Dark grayish blue (5,0:1), toujours barré |
| Q2 | Chiffre de la pastille à 2,6:1 | Chiffre Very dark blue sur la pastille Orange (6,4:1) |
| Q3 | Icônes − + à 2,4:1 | Orange plus foncé pour ces icônes : `hsl(26, 100%, 46%)` (3,1:1) |
| Q4 | Tablette sans maquette | 640 à 1023 px : structure mobile, photo et contenu centrés sur ≈ 550 px, photo arrondie |
| Q5 | Sélecteur après l'ajout | Retour à 0, quantités additionnées dans le panier |
| Q6 | Ouverture du panier | Au clic ; fermeture par 2e clic, Échap, clic dehors ou « Checkout » |
| Q7 | Visionneuse et page | Ouverture sur l'image affichée ; la page garde la dernière image vue |
| Q8 | États non dessinés | Liens du menu mobile Orange au survol ; supprimer plus foncé ; grande photo : voile léger |
| Q9 | Police Kumbh Sans | Choix en Phase 5 (Google Fonts ou fichiers locaux via npm), par l'humain |

Inventaire des éléments interactifs : 19 groupes (analyse, section 2A). Contour de focus 2 px décalé de 2 px partout.

## Validation G3 — maquette Penpot (2026-11-04)

Maquette validée telle quelle (`specs/visuel/penpot/maquette.md`) avec les seuils visuels calibrés : 5 % par écran, 5,2 % pour « Mobile · Page » et « Mobile · Panier rempli ». Les états composites de FM (plusieurs survols à la fois) sont comparés sur des zones ciblées en Phase 7.

## Changement de mode — Phase 6 (2026-11-04)

Le choix « Toi, avec moi en tuteur » avait été lu par l'agent comme « l'humain code, l'agent guide » ; l'humain voulait dire l'inverse. Passage en **mode Agent** au début de la Phase 6 : l'agent écrit le code, un commit par partie avec Claude en co-auteur ; l'humain valide les résultats. Les choix techniques de la Phase 5 (faits par l'humain) restent ; les points laissés « à ton choix » dans les ADR sont tranchés par l'agent et notés dans les ADR. Leçon de méthode : nommer l'acteur dans les options (« Claude écrit le code »), jamais « toi / moi ».

## Q10 — Icône de suppression (Phase 6)

L'icône de FM (`#C3CAD9`) est à 1,6:1 sur blanc, sous le minimum de 3:1 pour une icône nécessaire (A8) ; oubliée à l'inventaire de G2. Choix de l'agent, **validé par l'humain le 2026-11-04** : **Dark grayish blue** (4,9:1), Very dark blue au survol (Q8 « supprimer plus foncé »). Effet sur la zone S26b : quelques dizaines de pixels.
