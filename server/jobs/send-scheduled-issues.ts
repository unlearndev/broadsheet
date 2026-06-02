import { sendIssue } from '../lib/sendIssue'
import { allIssues } from '../store/issues'
import type { Job } from './loader'

const job: Job = {
  name: 'send-scheduled-issues',
  schedule: '* * * * *',
  async run() {
    const now = Date.now()
    const due = allIssues().filter(
      (issue) => issue.status === 'scheduled' && issue.scheduledFor && Date.parse(issue.scheduledFor) <= now,
    )

    for (const issue of due) {
      await sendIssue(issue)
    }
  },
}

export default job
