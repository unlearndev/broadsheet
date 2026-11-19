import debounce from 'lodash/debounce'
import { useEffect, useMemo, useState } from 'react'
import type { Subscriber } from '../../../shared/types'
import { api } from '../api'
import PageHeader from '../components/PageHeader'
import { formatDate } from '../utils/format'

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  const search = useMemo(
    () =>
      debounce((value: string) =>
        api.subscribers(value).then((results) => {
          setSubscribers(results)
          setLoading(false)
        }),
      250),
    [],
  )

  useEffect(() => {
    setLoading(true)
    search(query)
  }, [query, search])

  return (
    <section>
      <PageHeader title="Subscribers">
        <a className="button secondary" href="/api/subscribers/export">Export CSV</a>
        <input className="search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by email or name" />
      </PageHeader>
      <table className={loading && subscribers.length > 0 ? 'table is-refreshing' : 'table'} aria-busy={loading}>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Plan</th>
            <th>Status</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {loading && subscribers.length === 0 && (
            <tr>
              <td colSpan={5}>
                <div className="table-loading" role="status"><span className="spinner" aria-hidden="true" />Loading subscribers…</div>
              </td>
            </tr>
          )}
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td>{subscriber.email}</td>
              <td>{subscriber.name ?? '—'}</td>
              <td>{subscriber.tier === 'paid' ? 'Paid' : 'Free'}</td>
              <td>{subscriber.status === 'active' ? 'Active' : 'Unsubscribed'}</td>
              <td>{formatDate(subscriber.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
