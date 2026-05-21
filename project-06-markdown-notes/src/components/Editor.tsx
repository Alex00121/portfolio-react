import { useRef, useEffect, useCallback } from 'react'

interface EditorProps {
  content: string
  onChange: (content: string) => void
  toolbarAction: string | null
  onActionHandled: () => void
}

const ACTIONS: Record<string, { prefix: string; suffix: string; placeholder: string; block?: boolean }> = {
  bold: { prefix: '**', suffix: '**', placeholder: 'texte en gras' },
  italic: { prefix: '_', suffix: '_', placeholder: 'texte en italique' },
  h1: { prefix: '# ', suffix: '', placeholder: 'Titre principal', block: true },
  h2: { prefix: '## ', suffix: '', placeholder: 'Sous-titre', block: true },
  code: { prefix: '```\n', suffix: '\n```', placeholder: 'votre code ici', block: true },
  link: { prefix: '[', suffix: '](https://example.com)', placeholder: 'texte du lien' },
  image: { prefix: '![', suffix: '](https://example.com/image.png)', placeholder: 'description' },
  ul: { prefix: '- ', suffix: '', placeholder: 'élément de liste', block: true },
  ol: { prefix: '1. ', suffix: '', placeholder: 'élément de liste', block: true },
  quote: { prefix: '> ', suffix: '', placeholder: 'citation', block: true },
  hr: { prefix: '\n---\n', suffix: '', placeholder: '', block: true },
}

export default function Editor({ content, onChange, toolbarAction, onActionHandled }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyAction = useCallback(
    (action: string) => {
      const ta = textareaRef.current
      if (!ta) return

      const def = ACTIONS[action]
      if (!def) return

      const start = ta.selectionStart
      const end = ta.selectionEnd
      const selected = content.slice(start, end)

      let before = content.slice(0, start)
      let after = content.slice(end)

      let insert: string
      let newCursorStart: number
      let newCursorEnd: number

      if (def.block && start === end) {
        const lineStart = before.lastIndexOf('\n') + 1
        const lineContent = content.slice(lineStart, end) || def.placeholder
        before = content.slice(0, lineStart)
        after = content.slice(end)
        insert = def.prefix + lineContent + def.suffix
        newCursorStart = lineStart + def.prefix.length
        newCursorEnd = newCursorStart + lineContent.length
      } else if (selected) {
        insert = def.prefix + selected + def.suffix
        newCursorStart = start + def.prefix.length
        newCursorEnd = newCursorStart + selected.length
      } else {
        insert = def.prefix + def.placeholder + def.suffix
        newCursorStart = start + def.prefix.length
        newCursorEnd = newCursorStart + def.placeholder.length
      }

      const newContent = before + insert + after
      onChange(newContent)

      requestAnimationFrame(() => {
        if (!textareaRef.current) return
        textareaRef.current.focus()
        textareaRef.current.setSelectionRange(newCursorStart, newCursorEnd)
      })
    },
    [content, onChange]
  )

  useEffect(() => {
    if (toolbarAction) {
      applyAction(toolbarAction)
      onActionHandled()
    }
  }, [toolbarAction, applyAction, onActionHandled])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault()
      applyAction('bold')
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault()
      applyAction('italic')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newContent = content.slice(0, start) + '  ' + content.slice(end)
      onChange(newContent)
      requestAnimationFrame(() => {
        if (!textareaRef.current) return
        textareaRef.current.setSelectionRange(start + 2, start + 2)
      })
    }
  }

  return (
    <textarea
      ref={textareaRef}
      value={content}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      spellCheck={false}
      className="flex-1 resize-none outline-none p-5 text-sm leading-relaxed"
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        background: '#ffffff',
        color: '#1e293b',
        height: '100%',
        width: '100%',
        caretColor: '#6366f1',
      }}
      placeholder="Commencez à écrire en Markdown..."
    />
  )
}
