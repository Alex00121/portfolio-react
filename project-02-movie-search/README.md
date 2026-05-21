# CinéSearch — Moteur de Recherche de Films

## Description

CinéSearch est une application React permettant de rechercher des films à partir de la base de données TMDB (The Movie Database). Elle affiche les affiches, les notes, les synopsis et les genres, et permet de sauvegarder ses films favoris localement.

## Technologies utilisées

- **React 18** avec TypeScript
- **Vite** (bundler ultra-rapide)
- **Tailwind CSS** (thème cinématographique sombre personnalisé)
- **Lucide React** (icônes)
- **API TMDB v3** (films, détails, images)
- **localStorage** (persistance des favoris)

## Fonctionnalités

- Recherche de films par titre avec résultats paginés
- Affichage des affiches, titres, années et notes
- Badge de note coloré : vert (≥7), jaune (≥5), rouge (<5)
- Modal détaillée : synopsis, genres, durée, nombre de votes
- Onglet "Favoris" avec badge de compteur
- Ajout/retrait des favoris persisté dans localStorage
- État vide illustré et état "aucun résultat" avec suggestion
- Skeletons animés (animate-pulse) au chargement
- Pagination intelligente (max 500 pages)
- Design responsive : 2→3→4 colonnes selon la taille d'écran

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-react.git
cd portfolio-react/project-02-movie-search

# Installer les dépendances
npm install

# Configurer la clé API TMDB
cp .env.example .env
```

### Obtenir une clé API TMDB

1. Créez un compte gratuit sur [themoviedb.org](https://www.themoviedb.org/)
2. Rendez-vous dans **Paramètres → API**
3. Générez une clé **API v3 (auth)**
4. Ajoutez-la dans votre fichier `.env` :

```env
VITE_TMDB_KEY=votre_clé_api_v3_ici
```

## Lancer le projet

```bash
npm run dev
```

L'application sera accessible sur [http://localhost:5173](http://localhost:5173).

```bash
# Construire pour la production
npm run build

# Prévisualiser le build
npm run preview
```

## Aperçu

L'interface adopte un thème **cinématographique sombre** (`#1a1a2e` fond, `#e94560` accent rouge, `#16213e` cartes).

- **En-tête** : logo CinéSearch + navigation Recherche / Favoris (avec badge de compteur)
- **Recherche** : barre de recherche avec bouton "effacer", résultats en grille responsive
- **Cartes de films** : affiche TMDB, titre, année, badge de note, icône ♥ pour les favoris
- **Modal détaillée** : grande affiche, genres, durée, note étoilée, bouton "Ajouter aux favoris"
- **Favoris** : grille des films sauvegardés avec bouton de suppression individuel
- **Pagination** : numéros de pages, points de suspension intelligents, boutons Préc./Suiv.
