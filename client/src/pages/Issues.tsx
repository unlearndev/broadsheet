import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Issue } from '../../../shared/types'
import { api } from '../api'
import { PlusIcon } from '../components/icons'
import IssueRow from '../components/IssueRow'
import PageHeader from '../components/PageHeader'

export default function Issues() {
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    api.issues().then(setIssues)
  }, [])

  return (
    <section>
      <PageHeader title="Issues">
        <Link className="button" to="/issues/new"><PlusIcon />New issue</Link>
      </PageHeader>
      <div className="issue-table">
        <div className="issue-head"><span>Issue</span><span>Status</span><span>Date</span></div>
        <ul className="issue-list">
          {issues.map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </ul>
      </div>
    </section>
  )
}
