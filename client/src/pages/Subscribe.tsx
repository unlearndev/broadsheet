import { useState } from 'react'
import { PUBLICATION } from '../../../shared/publication'
import { api } from '../api'
import { BrandMark } from '../components/icons'
import PublicationMark from '../components/PublicationMark'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    try {
      await api.subscribe({ email, name })
      setDone(true)
    } catch {
      setError('Check your email address and try again.')
    }
  }

  return (
    <div className="public-page">
      <section className="subscribe-card">
        {done ? (
          <div className="subscribe-intro">
            <h1>You’re in</h1>
            <p className="lede">The next issue of {PUBLICATION} will land in {email}.</p>
          </div>
        ) : (
          <>
            <div className="subscribe-intro">
              <PublicationMark size={44} />
              <h1>{PUBLICATION}</h1>
              <p className="lede">AI for working developers: one or two things worth trying and one thing worth knowing, every other Thursday.</p>
            </div>
            <form onSubmit={submit} className="subscribe-form">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="field">
                <label htmlFor="name">Name <span>(optional)</span></label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <button type="submit">Subscribe</button>
              {error && <p className="error">{error}</p>}
            </form>
            <p className="fine-print">No spam. Unsubscribe any time.</p>
          </>
        )}
      </section>
      <p className="powered-by"><BrandMark size={16} />Powered by Broadsheet</p>
    </div>
  )
}
