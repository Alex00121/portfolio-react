import { useState, useMemo } from 'react'
import { Search, Plus, FileText, Tag, Trash2 } from 'lucide-react'
import { Note } from '../types/note'

interface SidebarProps {
  notes: Note[]
  activeNoteId: string | null
  searchQuery: string
  activeTag: string | null
  onSearchChange: (q: string) => void
  onSelectNote: (id: string) => void
  onNewNote: () => void
  onDeleteNote: (id: string) => void
  onTagClick: (tag: string | null) => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  if (diffDays === 0) return "Aujourd'hui"
  if (diffDays === 1) return 'Hier'
  if (diffDays < 7) return `Il y a ${diffDays} jours`
  return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

function getExcerpt(content: string): string {
  const lines = content.split('\n').filter((l) => l.trim() && !l.startsWith('#'))
  const first = lines[0] || ''
  return first.replace(/[*_`>]/g, '').slice(0, 60) || 'Note vide'
}

export default function Sidebar({
  notes,
  activeNoteId,
  searchQuery,
  activeTag,
  onSearchChange,
  onSelectNote,
  onNewNote,
  onDeleteNote,
  onTagClick,
}: SidebarProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const allTags = useMemo(
    () => Array.from(new Set(notes.flatMap((n) => n.tags))).sort(),
    [notes]
  )

  return (
    <aside
      className="flex flex-col h-full"
      style={{ width: 280, minWidth: 280, background: '#1e1e2e', borderRight: '1px solid #3d3d5c' }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" style={{ color: '#cba6f7' }} />
          <span className="font-bold text-white text-base tracking-tight">Markdown Notes</span>
        </div>
        <button
          onClick={onNewNote}
          title="Nouvelle note"
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{ background: '#cba6f7', color: '#1e1e2e' }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: '#6c7086' }}
          />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-all duration-200"
            style={{
              background: '#2a2a3e',
              border: '1px solid #3d3d5c',
              color: '#cdd6f4',
            }}
          />
        </div>
      </div>

      {/* Tags */}
      {allTags.length > 0 && (
        <div className="px-4 mb-3 flex flex-wrap gap-1">
          <button
            onClick={() => onTagClick(null)}
            className="px-2 py-0.5 rounded-full text-xs transition-all duration-200"
            style={{
              background: activeTag === null ? '#cba6f7' : '#2a2a3e',
              color: activeTag === null ? '#1e1e2e' : '#6c7086',
              border: '1px solid #3d3d5c',
            }}
          >
            Toutes
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag === activeTag ? null : tag)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all duration-200"
              style={{
                background: activeTag === tag ? '#cba6f7' : '#2a2a3e',
                color: activeTag === tag ? '#1e1e2e' : '#6c7086',
                border: '1px solid #3d3d5c',
              }}
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Notes list */}
      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: '#6c7086' }} />
            <p className="text-sm" style={{ color: '#6c7086' }}>
              Aucune note trouvée
            </p>
            <button
              onClick={onNewNote}
              className="mt-3 text-xs transition-all duration-200 hover:underline"
              style={{ color: '#cba6f7' }}
            >
              Créer une note
            </button>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              onMouseEnter={() => setHoveredId(note.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative px-4 py-3 cursor-pointer transition-all duration-200 border-l-2"
              style={{
                background:
                  activeNoteId === note.id
                    ? '#313145'
                    : hoveredId === note.id
                      ? '#252535'
                      : 'transparent',
                borderLeftColor:
                  activeNoteId === note.id ? '#cba6f7' : 'transparent',
              }}
            >
              <div className="pr-6">
                <p
                  className="font-semibold text-sm truncate"
                  style={{ color: activeNoteId === note.id ? '#cba6f7' : '#cdd6f4' }}
                >
                  {note.title || 'Sans titre'}
                </p>
                <p className="text-xs mt-0.5 truncate" style={{ color: '#6c7086' }}>
                  {getExcerpt(note.content)}
                </p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs" style={{ color: '#45475a' }}>
                    {formatDate(note.updatedAt)}
                  </span>
                  {note.tags.length > 0 && (
                    <div className="flex gap-1">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{ background: '#313145', color: '#cba6f7' }}
                        >
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-xs" style={{ color: '#45475a' }}>
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {hoveredId === note.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteNote(note.id)
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-all duration-200 hover:bg-red-500/20"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" style={{ color: '#f38ba8' }} />
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t" style={{ borderColor: '#3d3d5c' }}>
        <p className="text-xs" style={{ color: '#6c7086' }}>
          {notes.length} note{notes.length !== 1 ? 's' : ''} — Sauvegarde auto
        </p>
      </div>
    </aside>
  )
}
