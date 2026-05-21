# Markdown Notes

Application de prise de notes en Markdown avec éditeur en temps réel et aperçu instantané.

## Description

Markdown Notes est un éditeur de notes personnel entièrement en Markdown. L'interface en deux colonnes permet d'écrire et de visualiser le rendu simultanément. Toutes les notes sont sauvegardées automatiquement dans le navigateur.

## Technologies utilisées

- **React 18** + **TypeScript** — Interface réactive et typée
- **Vite** — Bundler ultra-rapide
- **Tailwind CSS** — Styles utilitaires
- **marked.js** — Compilation Markdown → HTML
- **lucide-react** — Icônes modernes
- **localStorage** — Persistance des données sans backend

## Fonctionnalités

- **Éditeur Markdown** avec police monospace et coloration syntaxique légère
- **Aperçu en temps réel** du rendu HTML avec styles typographiques soignés
- **Trois modes d'affichage** : Éditeur seul / Vue séparée / Aperçu seul
- **Barre d'outils** : gras, italique, titres H1/H2, code, lien, image, listes, citation, séparateur
- **Sauvegarde automatique** avec debounce de 500ms
- **Recherche en temps réel** dans les titres et contenus
- **Système de tags** : ajout par virgule ou Entrée, filtre par tag dans la barre latérale
- **Export** de la note active au format `.md`
- **Raccourcis clavier** : `Ctrl+B` (gras), `Ctrl+I` (italique), `Tab` (indentation)
- **Copie de code** : bouton "Copier" sur chaque bloc de code dans l'aperçu

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Alex00121/portfolio-react.git
cd portfolio-react/project-06-markdown-notes

# Installer les dépendances
npm install
```

## Lancer le projet

```bash
npm run dev
```

L'application est accessible sur [http://localhost:5173](http://localhost:5173).

Pour créer une version de production :

```bash
npm run build
npm run preview
```

## Aperçu

L'interface est divisée en deux zones principales :

**Barre latérale gauche (280px, fond sombre `#1e1e2e`)**
- Titre de l'application avec bouton "+" pour créer une note
- Barre de recherche avec filtrage instantané
- Chips de tags cliquables pour filtrer les notes
- Liste des notes avec titre, extrait du contenu et date relative
- Bouton de suppression visible au survol

**Zone principale (fond blanc)**
- Champ de titre éditable en haut
- Barre d'outils avec boutons de formatage Markdown
- Basculement Éditeur / Séparé / Aperçu
- Bouton d'export `.md`
- Éditeur de code (police `JetBrains Mono`)
- Aperçu HTML avec typographie soignée : titres hiérarchisés, blocs de code avec bouton "Copier", tableaux, citations stylisées
- Zone de tags en bas de page

4 notes d'exemple sont pré-chargées au premier lancement.
