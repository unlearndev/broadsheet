import { Link } from 'react-router'
import type { Issue } from '../../../shared/types'

function formatIssueDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function IssueRow({ issue }: { issue: Issue }) {
  const date = issue.sentAt ?? issue.scheduledFor ?? issue.createdAt

  return (
    <li className="issue-row">
      <Link to={`/issues/${issue.id}`}>{issue.title}</Link>
      <span className={`badge badge-${issue.status}`}>{issue.status}</span>
      <time dateTime={date}>{formatIssueDate(date)}</time>
    </li>
  )
}
