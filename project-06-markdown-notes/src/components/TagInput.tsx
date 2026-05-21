import { useState, KeyboardEvent } from 'react'
import { X, Tag } from 'lucide-react'

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
}

export default function TagInput({ tags, onChange }: TagInputProps) {
  const [input, setInput] = useState('')

  function addTag(raw: string) {
    const tag = raw.trim().toLowerCase().replace(/\s+/g, '-')
    if (tag && !tags.includes(tag) && tags.length < 10) {
      onChange([...tags, tag])
    }
    setInput('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1))
    }
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag))
  }

  return (
    <div
      className="flex items-center flex-wrap gap-1.5 px-3 py-2 min-h-[38px]"
      style={{
        background: '#f8f9fa',
        borderTop: '1px solid #e2e8f0',
      }}
    >
      <Tag className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#94a3b8' }} />
      {tags.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{ background: '#ede9fe', color: '#6d28d9' }}
        >
          {tag}
          <button
            onClick={() => removeTag(tag)}
            className="hover:text-purple-900 transition-colors"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && addTag(input)}
        placeholder={tags.length === 0 ? 'Ajouter des tags (Entrée ou virgule)...' : ''}
        className="flex-1 min-w-[120px] text-xs outline-none bg-transparent"
        style={{ color: '#475569' }}
      />
    </div>
  )
}
