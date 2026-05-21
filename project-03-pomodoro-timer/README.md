# Pomodoro Timer

## Description

Application de minuterie Pomodoro construite avec React et TypeScript. Elle permet de gérer des sessions de travail focalisées en alternant automatiquement entre les phases Pomodoro, pause courte et pause longue, selon la technique de productivité éponyme.

## Technologies utilisées

- **React 18** avec TypeScript
- **Vite** — bundler et serveur de développement
- **Tailwind CSS** — styles utilitaires
- **Lucide React** — icônes
- **Web Notifications API** — notifications navigateur
- **AudioContext API** — son de cloche généré programmatiquement (aucun fichier audio externe)

## Fonctionnalités

- **3 modes** : Pomodoro (25 min), Pause courte (5 min), Pause longue (15 min)
- **Anneau SVG animé** : progression visuelle avec `stroke-dashoffset`
- **Cycle automatique** : après 4 pomodoros, passage automatique en pause longue
- **Son de fin de session** : cloche générée via `AudioContext` (oscillateur)
- **Notifications navigateur** : alertes à la fin de chaque session (avec permission)
- **Raccourcis clavier** : `Espace` démarrer/pause, `R` réinitialiser, `1`/`2`/`3` changer de mode
- **Paramètres personnalisables** : durée de chaque mode et intervalle de pause longue
- **Historique des sessions** : liste scrollable des sessions terminées avec durée et heure
- **Titre de page dynamique** : le compte à rebours s'affiche dans l'onglet du navigateur

## Installation

```bash
cd project-03-pomodoro-timer
npm install
```

## Lancer le projet

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## Aperçu

L'interface est centrée sur fond sombre (`#0a0a1a`) avec un halo coloré qui change selon le mode actif — rouge pour le Pomodoro, vert pour la pause courte, bleu pour la pause longue. L'anneau SVG de progression occupe le centre de la page. Les points de cycle sous le sélecteur de mode indiquent la progression vers la prochaine pause longue. Le panneau d'historique en bas liste toutes les sessions complétées avec leurs badges colorés.
