import { useEffect, useState } from 'react'
import type { Issue } from '../../../shared/types'
import { api, type Stats } from '../api'
import IssueRow from '../components/IssueRow'
import StatCard from '../components/StatCard'
import { formatDate, formatPercent } from '../utils/format'

export default function Dashboard() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    api.issues().then(setIssues)
    api.stats().then(setStats)
  }, [])

  return (
    <section>
      <h1>Dashboard</h1>
      {stats && (
        <div className="stats">
          <StatCard label="Active subscribers" value={String(stats.activeSubscribers)} hint={`${stats.paidSubscribers} paid`} />
          <StatCard label="Average open rate" value={formatPercent(stats.openRate)} hint={`${stats.issuesSent} issues sent`} />
          <StatCard label="Average click rate" value={formatPercent(stats.clickRate)} />
          <StatCard label="Last issue" value={stats.lastSentAt ? formatDate(stats.lastSentAt) : 'Not yet'} />
        </div>
      )}
      <h2>Recent issues</h2>
      <ul className="issue-list">
        {issues.slice(0, 5).map((issue) => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </ul>
    </section>
  )
}
