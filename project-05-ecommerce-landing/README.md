# ShopWave — Landing E-commerce

## Description

ShopWave est une landing page e-commerce moderne construite avec React, TypeScript et Framer Motion. Elle présente un catalogue de produits interactif avec filtrage par catégorie, un panier dynamique avec tiroir animé, et une expérience utilisateur fluide et responsive.

## Technologies utilisées

- **React 18** — bibliothèque UI
- **TypeScript** — typage statique
- **Vite** — outil de build ultra-rapide
- **Tailwind CSS** — styles utilitaires
- **Framer Motion** — animations fluides (hero reveal, stagger, drawer)
- **Lucide React** — icônes vectorielles

## Fonctionnalités

- Hero pleine hauteur avec animation en cascade (stagger children Framer Motion)
- Filtrage des produits par catégorie (Tous, Vêtements, Électronique, Maison, Sport)
- Grille de produits responsive (2 → 3 → 4 colonnes)
- Animations d'apparition décalées au chargement
- Bouton "Ajouter au panier" avec animation de confirmation (vert + icône check)
- Tiroir panier (CartDrawer) qui slide depuis la droite avec overlay flou
- Contrôles de quantité + suppression d'articles
- Calcul automatique : sous-total, livraison gratuite dès 49 €, total
- Navbar fixe responsive avec menu hamburger sur mobile
- Badge article count sur l'icône panier

## Installation

```bash
cd project-05-ecommerce-landing
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

## Aperçu

La page s'ouvre sur un **Hero** pleine hauteur avec un titre en gradient indigo → violet → rose, un sous-titre, un badge "Nouvelle collection" et deux CTA. Des cercles flous décoratifs animent le fond blanc. En dessous, la section **Catalogue** présente 12 produits fictifs répartis en 4 catégories. Chaque carte produit affiche un bloc dégradé coloré (en guise de visuel), le nom, la note étoiles, le prix et un bouton "Ajouter" qui vire au vert avec une animation de confirmation. Le **tiroir panier** s'ouvre depuis la droite avec un backdrop flouté, liste les articles avec contrôles de quantité, et calcule le total en temps réel.
