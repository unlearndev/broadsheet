import { useEffect, useState } from 'react'
import type { Issue, Subscriber } from '../../../shared/types'
import { api } from '../api'
import IssueRow from '../components/IssueRow'

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])

  useEffect(() => {
    api.issues().then(setIssues)
    api.subscribers().then(setSubscribers)
  }, [])

  const active = subscribers.filter((subscriber) => subscriber.status === 'active').length

  return (
    <section>
      <h1>Dashboard</h1>
      <p className="lede">{active} active subscribers</p>
      <h2>Recent issues</h2>
      <ul className="issue-list">
        {issues.slice(0, 5).map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </ul>
    </section>
  )
}
