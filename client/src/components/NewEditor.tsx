import { useRef } from 'react'

interface Props {
  title: string
  body: string
  onChange: (body: string) => void
}

const tools = [
  { label: 'B', title: 'Bold', before: '**', after: '**' },
  { label: 'I', title: 'Italic', before: '_', after: '_' },
  { label: 'Link', title: 'Link', before: '[', after: '](https://)' },
  { label: 'Quote', title: 'Quote', before: '> ', after: '' },
]

export default function NewEditor({ title, body, onChange }: Props) {
  const textarea = useRef<HTMLTextAreaElement>(null)
  const words = body.trim() ? body.trim().split(/\s+/).length : 0

  function wrap(before: string, after: string) {
    const el = textarea.current
    if (!el) return
    const { selectionStart: start, selectionEnd: end } = el
    onChange(body.slice(0, start) + before + body.slice(start, end) + after + body.slice(end))
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, end + before.length)
    })
  }

  return (
    <div className="new-editor">
      <div className="toolbar">
        {tools.map((tool) => (
          <button key={tool.label} type="button" title={tool.title} onClick={() => wrap(tool.before, tool.after)}>
            {tool.label}
          </button>
        ))}
        <span className="word-count">{words} words · {Math.max(1, Math.round(words / 230))} min read</span>
      </div>
      <div className="split">
        <textarea ref={textarea} value={body} onChange={(e) => onChange(e.target.value)} placeholder="Write something worth reading" />
        <article className="preview">
          <h2>{title || 'Untitled'}</h2>
          {body.split(/\n{2,}/).map((paragraph, i) =>
            paragraph.startsWith('> ') ? <blockquote key={i}>{paragraph.slice(2)}</blockquote> : <p key={i}>{paragraph}</p>,
          )}
        </article>
      </div>
    </div>
  )
}
