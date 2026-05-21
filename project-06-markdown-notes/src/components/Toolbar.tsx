import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Code,
  Link,
  Image,
  List,
  ListOrdered,
  Quote,
  Minus,
  Download,
} from 'lucide-react'
import { ViewMode } from '../types/note'

interface ToolbarProps {
  onAction: (action: string) => void
  onExport: () => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

interface ToolbarButton {
  icon: React.ReactNode
  title: string
  action: string
}

const BUTTONS: ToolbarButton[] = [
  { icon: <Bold className="w-4 h-4" />, title: 'Gras (Ctrl+B)', action: 'bold' },
  { icon: <Italic className="w-4 h-4" />, title: 'Italique (Ctrl+I)', action: 'italic' },
  { icon: <Heading1 className="w-4 h-4" />, title: 'Titre H1', action: 'h1' },
  { icon: <Heading2 className="w-4 h-4" />, title: 'Titre H2', action: 'h2' },
  { icon: <Code className="w-4 h-4" />, title: 'Bloc de code', action: 'code' },
  { icon: <Link className="w-4 h-4" />, title: 'Lien', action: 'link' },
  { icon: <Image className="w-4 h-4" />, title: 'Image', action: 'image' },
  { icon: <List className="w-4 h-4" />, title: 'Liste non ordonnée', action: 'ul' },
  { icon: <ListOrdered className="w-4 h-4" />, title: 'Liste ordonnée', action: 'ol' },
  { icon: <Quote className="w-4 h-4" />, title: 'Citation', action: 'quote' },
  { icon: <Minus className="w-4 h-4" />, title: 'Séparateur', action: 'hr' },
]

const VIEW_MODES: { value: ViewMode; label: string }[] = [
  { value: 'editor', label: 'Éditeur' },
  { value: 'split', label: 'Séparé' },
  { value: 'preview', label: 'Aperçu' },
]

export default function Toolbar({ onAction, onExport, viewMode, onViewModeChange }: ToolbarProps) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 border-b gap-2 flex-shrink-0"
      style={{
        background: '#f8f9fa',
        borderColor: '#e2e8f0',
      }}
    >
      <div className="flex items-center gap-0.5 flex-wrap">
        {BUTTONS.map((btn) => (
          <button
            key={btn.action}
            onClick={() => onAction(btn.action)}
            title={btn.title}
            className="p-1.5 rounded transition-all duration-200 hover:bg-slate-200 active:scale-95"
            style={{ color: '#475569' }}
          >
            {btn.icon}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="flex rounded-lg overflow-hidden"
          style={{ border: '1px solid #e2e8f0' }}
        >
          {VIEW_MODES.map((mode) => (
            <button
              key={mode.value}
              onClick={() => onViewModeChange(mode.value)}
              className="px-3 py-1 text-xs font-medium transition-all duration-200"
              style={{
                background: viewMode === mode.value ? '#6366f1' : '#ffffff',
                color: viewMode === mode.value ? '#ffffff' : '#64748b',
              }}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExport}
          title="Exporter en .md"
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{ background: '#1e293b', color: '#ffffff' }}
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </div>
  )
}
