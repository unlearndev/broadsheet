import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import type { Issue } from '../../../shared/types'
import { api, type Stats } from '../api'
import { CalendarIcon, ChevronIcon, ClickIcon, MailIcon, PlusIcon, SubscribersIcon } from '../components/icons'
import IssueRow from '../components/IssueRow'
import PageHeader from '../components/PageHeader'
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
      <PageHeader title="Dashboard">
        <Link className="button" to="/issues/new"><PlusIcon />New issue</Link>
      </PageHeader>
      {stats && (
        <div className="stats">
          <StatCard icon={<SubscribersIcon />} label="Active subscribers" value={String(stats.activeSubscribers)} hint={`${stats.paidSubscribers} paid`} />
          <StatCard icon={<MailIcon />} label="Average open rate" value={formatPercent(stats.openRate)} hint={`${stats.issuesSent} issues sent`} />
          <StatCard icon={<ClickIcon />} label="Average click rate" value={formatPercent(stats.clickRate)} />
          <StatCard icon={<CalendarIcon />} label="Last issue" value={stats.lastSentAt ? formatDate(stats.lastSentAt) : 'Not yet'} />
        </div>
      )}
      <div className="section-title">
        <h2>Recent issues</h2>
        <Link to="/issues">View all<ChevronIcon /></Link>
      </div>
      <div className="issue-table">
        <div className="issue-head"><span>Issue</span><span>Status</span><span>Date</span></div>
        <ul className="issue-list">
          {issues.slice(0, 5).map((issue) => (
            <IssueRow key={issue.id} issue={issue} />
          ))}
        </ul>
      </div>
    </section>
  )
}
