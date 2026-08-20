import { useEffect, useState } from 'react'
import type { Subscriber } from '../../../shared/types'
import { api } from '../api'
import { useSubscriberSearch } from '../hooks/useSubscriberSearch'

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [query, setQuery] = useState('')
  const results = useSubscriberSearch(subscribers, query)

  useEffect(() => {
    api.subscribers().then(setSubscribers)
  }, [])

  return (
    <section>
      <div className="section-header">
        <h1>Subscribers</h1>
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
          {results.map((subscriber) => (
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
