import { useState } from 'react'
import { api } from '../api'

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

  if (done) {
    return (
      <section className="subscribe">
        <h1>You’re in</h1>
        <p className="lede">The next issue will land in {email}.</p>
      </section>
    )
  }

  return (
    <section className="subscribe">
      <h1>Subscribe</h1>
      <p className="lede">One email a fortnight. No spam, unsubscribe any time.</p>
      <form onSubmit={submit} className="subscribe-form">
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (optional)" />
        <button type="submit">Subscribe</button>
        {error && <p className="error">{error}</p>}
      </form>
    </section>
  )
}
