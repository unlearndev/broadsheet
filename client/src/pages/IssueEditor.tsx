import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import type { IssueStatus } from '../../../shared/types'
import { api } from '../api'

export default function IssueEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [status, setStatus] = useState<IssueStatus>('draft')
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api.issue(id).then((issue) => {
      setTitle(issue.title)
      setBody(issue.body)
      setStatus(issue.status)
    })
  }, [id])

  async function save() {
    setSaving(true)
    const issue = id ? await api.updateIssue(id, { title, body }) : await api.createIssue({ title, body })
    setSaving(false)
    if (!id) navigate(`/issues/${issue.id}`)
  }

  async function send() {
    if (!id || !confirm('Send this issue to every active subscriber now?')) return
    const result = await api.sendIssue(id)
    setStatus('sent')
    setNotice(`Sent to ${result.sent} subscribers.`)
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
      <div className="actions">
        <button onClick={save} disabled={saving || !title.trim() || status === 'sent'}>
          {saving ? 'Saving…' : 'Save draft'}
        </button>
        {id && status !== 'sent' && (
          <button className="secondary" onClick={send}>
            Send now
          </button>
        )}
        {notice && <span className="notice">{notice}</span>}
      </div>
    </section>
  )
}
