import { useEffect, useState } from 'react'
import type { Subscriber } from '../../../shared/types'
import { api } from '../api'

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    api.subscribers().then(setSubscribers)
  }, [])

  return (
    <section>
      <h1>Subscribers</h1>
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
              <td>{subscriber.isActive ? 'Active' : 'Unsubscribed'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
