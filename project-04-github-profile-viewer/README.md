# GitHub Profile Viewer

## Description

Application React permettant d'explorer n'importe quel profil GitHub public. Saisissez un nom d'utilisateur pour afficher sa photo de profil, ses statistiques (dépôts, abonnés, étoiles totales), la liste triable de ses dépôts et un graphique donut de distribution des langages de programmation.

## Technologies utilisées

- **React 18** avec TypeScript
- **Vite** — bundler ultra-rapide
- **Tailwind CSS** — styles utilitaires, mode sombre inclus
- **Recharts** — graphique donut interactif
- **lucide-react** — icônes SVG cohérentes
- **API GitHub REST** (publique, sans clé)

## Fonctionnalités

- Recherche instantanée d'un utilisateur GitHub par nom d'utilisateur
- Affichage complet du profil : avatar, bio, localisation, site web, Twitter, entreprise
- Statistiques clés : nombre de dépôts, abonnés, abonnements, total des étoiles
- Liste des dépôts triable par étoiles, forks ou date de mise à jour
- Filtre pour inclure ou exclure les forks
- Graphique donut (Recharts) avec distribution des langages sur tous les dépôts
- Mode sombre / clair avec bascule persistée dans `localStorage`
- Squelettes de chargement animés (`animate-pulse`)
- Bannière d'avertissement lorsque la limite de l'API GitHub approche (< 15 requêtes restantes)
- Suggestions de profils célèbres pour démarrer rapidement

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-react.git
cd portfolio-react/project-04-github-profile-viewer

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173) dans le navigateur.

Pour construire la version de production :

```bash
npm run build
npm run preview
```

> **Note :** L'API GitHub publique autorise 60 requêtes par heure sans authentification. Chaque recherche consomme 2 requêtes (profil + dépôts).

## Aperçu

L'interface présente un en-tête fixe avec barre de recherche et bouton de bascule sombre/clair. La page d'accueil propose des suggestions de profils populaires (torvalds, gaearon, sindresorhus…). Après recherche, une carte de profil apparaît avec l'avatar (96 px, anneau indigo), le nom, le pseudo `@handle`, la bio et 4 tuiles de statistiques. En dessous, la liste des dépôts (triable sur 3 colonnes) s'affiche sur 2/3 de la largeur, avec le graphique donut des langages sur 1/3 à droite. Chaque dépôt montre un point coloré pour le langage, les étoiles, les forks et la date relative ("il y a 3 mois"). L'ensemble est responsive : une seule colonne sur mobile, mise en page complète sur desktop.
