import { Hono } from 'hono'
import { allIssues } from '../store/issues'
import { subscribers } from '../store/SubscriberRepository'

const stats = new Hono()

stats.get('/', (c) => {
  const sent = allIssues().filter((issue) => issue.status === 'sent' && issue.stats)
  const rate = (pick: (s: { recipients: number; opens: number; clicks: number }) => number) =>
    sent.length === 0
      ? 0
      : sent.reduce((total, issue) => total + pick(issue.stats!) / Math.max(1, issue.stats!.recipients), 0) / sent.length

  return c.json({
    activeSubscribers: subscribers.active().length,
    paidSubscribers: subscribers.paid().length,
    issuesSent: sent.length,
    openRate: rate((s) => s.opens),
    clickRate: rate((s) => s.clicks),
    lastSentAt: sent.map((issue) => issue.sentAt!).sort().at(-1) ?? null,
  })
})

export default stats
