import { useEffect, useRef } from 'react'
import { marked } from 'marked'

interface PreviewProps {
  content: string
}

marked.setOptions({
  gfm: true,
  breaks: true,
})

export default function Preview({ content }: PreviewProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const html = marked.parse(content) as string
    ref.current.innerHTML = html

    ref.current.querySelectorAll('pre').forEach((pre) => {
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative'
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)

      const btn = document.createElement('button')
      btn.className = 'copy-btn'
      btn.textContent = 'Copier'
      btn.style.cssText =
        'position:absolute;top:8px;right:8px;padding:2px 10px;border-radius:6px;' +
        'font-size:11px;background:#334155;color:#94a3b8;border:1px solid #475569;' +
        'cursor:pointer;transition:all 0.2s;font-family:inherit'
      btn.onclick = () => {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          btn.textContent = 'Copié !'
          btn.style.color = '#86efac'
          setTimeout(() => {
            btn.textContent = 'Copier'
            btn.style.color = '#94a3b8'
          }, 1500)
        })
      }
      wrapper.appendChild(btn)
    })
  }, [content])

  return (
    <div
      ref={ref}
      className="prose-preview flex-1 overflow-y-auto px-6 py-5"
      style={{ background: '#ffffff' }}
    />
  )
}
