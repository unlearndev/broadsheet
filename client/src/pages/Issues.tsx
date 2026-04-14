import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Issue } from '../../../shared/types'
import { api } from '../api'
import IssueRow from '../components/IssueRow'

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    api.issues().then(setIssues)
  }, [])

  return (
    <section>
      <div className="section-header">
        <h1>Issues</h1>
        <Link className="button" to="/issues/new">New issue</Link>
      </div>
      <ul className="issue-list">
        {issues.map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </ul>
    </section>
  )
}
