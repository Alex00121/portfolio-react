import { useState, useMemo, useEffect } from 'react'
import { FileText } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Toolbar from './components/Toolbar'
import Editor from './components/Editor'
import Preview from './components/Preview'
import TagInput from './components/TagInput'
import { useNotes } from './hooks/useNotes'
import { useDebounce } from './hooks/useDebounce'

type ViewMode = 'editor' | 'split' | 'preview'

export default function App() {
  const { notes, createNote, updateNote, deleteNote } = useNotes()
  const [activeNoteId, setActiveNoteId] = useState<string | null>(
    () => notes[0]?.id ?? null
  )
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('split')
  const [toolbarAction, setToolbarAction] = useState<string | null>(null)
  const [pendingContent, setPendingContent] = useState('')
  const [isDirty, setIsDirty] = useState(false)

  const activeNote = notes.find((n) => n.id === activeNoteId) ?? null

  useEffect(() => {
    if (activeNote) {
      setPendingContent(activeNote.content)
      setIsDirty(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNoteId])

  const debouncedSave = useDebounce((id: string, content: string) => {
    updateNote(id, { content })
    setIsDirty(false)
  }, 500)

  function handleContentChange(content: string) {
    setPendingContent(content)
    setIsDirty(true)
    if (activeNoteId) {
      debouncedSave(activeNoteId, content)
    }
  }

  function handleSelectNote(id: string) {
    if (activeNoteId && isDirty) {
      updateNote(activeNoteId, { content: pendingContent })
    }
    setActiveNoteId(id)
  }

  function handleNewNote() {
    const note = createNote()
    setActiveNoteId(note.id)
  }

  function handleDeleteNote(id: string) {
    deleteNote(id)
    if (activeNoteId === id) {
      const remaining = notes.filter((n) => n.id !== id)
      setActiveNoteId(remaining[0]?.id ?? null)
    }
  }

  function handleExport() {
    if (!activeNote) return
    const blob = new Blob([pendingContent], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${activeNote.title.replace(/[^a-z0-9\-_]/gi, '_') || 'note'}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredNotes = useMemo(() => {
    let result = notes
    if (activeTag) {
      result = result.filter((n) => n.tags.includes(activeTag))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (n) => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
      )
    }
    return result
  }, [notes, searchQuery, activeTag])

  const displayContent = isDirty ? pendingContent : (activeNote?.content ?? '')

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Sidebar
        notes={filteredNotes}
        activeNoteId={activeNoteId}
        searchQuery={searchQuery}
        activeTag={activeTag}
        onSearchChange={setSearchQuery}
        onSelectNote={handleSelectNote}
        onNewNote={handleNewNote}
        onDeleteNote={handleDeleteNote}
        onTagClick={setActiveTag}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {activeNote ? (
          <>
            <div
              className="px-5 pt-4 pb-2 flex-shrink-0"
              style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}
            >
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => updateNote(activeNote.id, { title: e.target.value })}
                className="w-full text-xl font-bold outline-none bg-transparent tracking-tight"
                style={{ color: '#0f172a' }}
                placeholder="Titre de la note"
              />
            </div>

            <Toolbar
              onAction={(action) => setToolbarAction(action)}
              onExport={handleExport}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <div className="flex-1 flex overflow-hidden">
              {(viewMode === 'editor' || viewMode === 'split') && (
                <div
                  className="flex flex-col overflow-hidden"
                  style={{
                    flex: viewMode === 'split' ? '0 0 50%' : '1 1 100%',
                    borderRight: viewMode === 'split' ? '1px solid #e2e8f0' : 'none',
                  }}
                >
                  <Editor
                    content={displayContent}
                    onChange={handleContentChange}
                    toolbarAction={toolbarAction}
                    onActionHandled={() => setToolbarAction(null)}
                  />
                </div>
              )}

              {(viewMode === 'preview' || viewMode === 'split') && (
                <div
                  className="flex flex-col overflow-hidden"
                  style={{ flex: viewMode === 'split' ? '0 0 50%' : '1 1 100%' }}
                >
                  <Preview content={displayContent} />
                </div>
              )}
            </div>

            <TagInput tags={activeNote.tags} onChange={(tags) => updateNote(activeNote.id, { tags })} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{ background: '#f1f5f9' }}
            >
              <FileText className="w-10 h-10" style={{ color: '#94a3b8' }} />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-semibold" style={{ color: '#1e293b' }}>
                Aucune note sélectionnée
              </h2>
              <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                Sélectionnez une note dans la barre latérale ou créez-en une nouvelle.
              </p>
            </div>
            <button
              onClick={handleNewNote}
              className="px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 hover:opacity-90 active:scale-95"
              style={{ background: '#6366f1', color: '#ffffff' }}
            >
              Nouvelle note
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
