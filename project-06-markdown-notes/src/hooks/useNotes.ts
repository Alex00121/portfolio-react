import { useState, useCallback } from 'react'
import { Note } from '../types/note'

const STORAGE_KEY = 'markdown-notes-v1'

const SEED_NOTES: Note[] = [
  {
    id: '1',
    title: 'Bienvenue dans Markdown Notes',
    content: `# Bienvenue dans Markdown Notes 🎉

Cette application vous permet de prendre des notes en **Markdown** avec un éditeur en temps réel.

## Fonctionnalités

- ✅ Éditeur Markdown avec aperçu en direct
- ✅ Sauvegarde automatique dans le navigateur
- ✅ Recherche dans vos notes
- ✅ Organisation par tags
- ✅ Export en fichier \`.md\`

## Raccourcis clavier

| Action | Raccourci |
|--------|-----------|
| Gras | \`Ctrl + B\` |
| Italique | \`Ctrl + I\` |
| Nouvelle note | \`Ctrl + N\` |

## Exemple de code

\`\`\`javascript
const notes = loadNotes()
notes.forEach(note => console.log(note.title))
\`\`\`

Bonne prise de notes !`,
    tags: ['guide', 'démarrage'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '2',
    title: 'Idées de projets React',
    content: `# Idées de projets React

## Applications à construire

### Niveau débutant
- **Todo list** avec filtres et localStorage
- **Calculatrice** avec historique
- **Quiz interactif** avec score

### Niveau intermédiaire
- **Dashboard météo** avec OpenMeteo API
- **Gestionnaire de films** avec TMDB
- **Chat en temps réel** avec WebSockets

### Niveau avancé
- **Éditeur de code** avec CodeMirror
- **Tableau Kanban** avec drag & drop
- **Application de dessin** avec Canvas API

## Notes

> Commencer par les projets débutants pour solidifier les bases de React avant de passer aux projets avancés.

L'important est de **pratiquer régulièrement** et de construire des projets concrets.`,
    tags: ['react', 'projets', 'idées'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    title: 'Notes de réunion — Sprint Planning',
    content: `# Sprint Planning — Semaine 42

**Date :** Lundi 14 octobre 2024
**Participants :** Alice, Bob, Charlie, Diana

## Objectifs du sprint

1. Finaliser la page d'accueil (Alice)
2. Implémenter l'authentification JWT (Bob)
3. Créer les tests unitaires (Charlie)
4. Rédiger la documentation API (Diana)

## Points discutés

### Performance
- Problème de temps de chargement sur mobile identifié
- Solution : code splitting + lazy loading des composants

### Design
- Validation des maquettes par le client ✅
- Ajustements mineurs sur la palette de couleurs

## Actions à suivre

- [ ] Bob : PR pour l'auth avant mercredi
- [ ] Alice : Revue de code de la PR de Bob
- [ ] Charlie : Setup Jest + Testing Library
- [ ] Diana : Premier draft de la doc API

## Prochaine réunion

Vendredi 18 octobre à 14h00 — Demo et rétrospective`,
    tags: ['travail', 'réunion', 'sprint'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '4',
    title: 'Ressources TypeScript',
    content: `# Ressources TypeScript

## Documentation officielle
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)

## Concepts clés

### Types utilitaires

\`\`\`typescript
// Partial — rend toutes les propriétés optionnelles
type PartialUser = Partial<User>

// Required — rend toutes les propriétés obligatoires
type RequiredUser = Required<User>

// Pick — sélectionne certaines propriétés
type UserPreview = Pick<User, 'id' | 'name' | 'email'>

// Omit — exclut certaines propriétés
type UserWithoutPassword = Omit<User, 'password'>

// Record — type pour les objets avec clés dynamiques
type ColorMap = Record<string, string>
\`\`\`

### Generics

\`\`\`typescript
function identity<T>(value: T): T {
  return value
}

interface ApiResponse<T> {
  data: T
  status: number
  message: string
}
\`\`\`

## Livres recommandés

1. **Programming TypeScript** — Boris Cherny
2. **Effective TypeScript** — Dan Vanderkam
3. **TypeScript Deep Dive** — Basarat Ali Syed (gratuit en ligne)`,
    tags: ['typescript', 'apprentissage', 'ressources'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

function loadFromStorage(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_NOTES
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0) return parsed
    return SEED_NOTES
  } catch {
    return SEED_NOTES
  }
}

function saveToStorage(notes: Note[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadFromStorage())

  const saveNotes = useCallback((updated: Note[]) => {
    setNotes(updated)
    saveToStorage(updated)
  }, [])

  const createNote = useCallback(() => {
    const note: Note = {
      id: crypto.randomUUID(),
      title: 'Nouvelle note',
      content: '# Nouvelle note\n\nCommencez à écrire ici...',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [note, ...notes]
    saveNotes(updated)
    return note
  }, [notes, saveNotes])

  const updateNote = useCallback(
    (id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>) => {
      const updated = notes.map((n) =>
        n.id === id ? { ...n, ...patch, updatedAt: new Date().toISOString() } : n
      )
      saveNotes(updated)
    },
    [notes, saveNotes]
  )

  const deleteNote = useCallback(
    (id: string) => {
      const updated = notes.filter((n) => n.id !== id)
      saveNotes(updated)
    },
    [notes, saveNotes]
  )

  return { notes, createNote, updateNote, deleteNote }
}
