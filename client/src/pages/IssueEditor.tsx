import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { api } from '../api'

export default function IssueEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!id) return
    api.issue(id).then((issue) => {
      setTitle(issue.title)
      setBody(issue.body)
    })
  }, [id])

  async function save() {
    setSaving(true)
    const issue = id ? await api.updateIssue(id, { title, body }) : await api.createIssue({ title, body })
    setSaving(false)
    if (!id) navigate(`/issues/${issue.id}`)
  }

  return (
    <section className="editor">
      <input className="title-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Issue title" />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={18} placeholder="Write something worth reading" />
      <div className="preview">
        <h2>{title}</h2>
        {body.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
      <button onClick={save} disabled={saving || !title.trim()}>
        {saving ? 'Saving…' : 'Save draft'}
      </button>
    </section>
  )
}
