import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import type { Subscriber } from '../../../shared/types'
import { api } from '../api'

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [query, setQuery] = useState('')

  const search = useMemo(() => debounce((value: string) => api.subscribers(value).then(setSubscribers), 250), [])

  useEffect(() => {
    search(query)
  }, [query, search])

  return (
    <section>
      <div className="section-header">
        <h1>Subscribers</h1>
        <a className="button secondary" href="/api/subscribers/export">Export CSV</a>
        <input className="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by email or name" />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Plan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td>{subscriber.email}</td>
              <td>{subscriber.name ?? '—'}</td>
              <td>{subscriber.tier === 'paid' ? 'Paid' : 'Free'}</td>
              <td>{subscriber.status === 'active' ? 'Active' : 'Unsubscribed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
