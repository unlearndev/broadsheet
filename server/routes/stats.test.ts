import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { useMemoryDb } from '../store/db'
import { makeIssue, makeSubscriber } from '../test/fixtures'

const app = createApp()

beforeEach(() => {
  useMemoryDb({
    subscribers: [
      makeSubscriber({ id: 'a', email: 'a@example.com', tier: 'paid' }),
      makeSubscriber({ id: 'b', email: 'b@example.com' }),
      makeSubscriber({ id: 'c', email: 'c@example.com', status: 'unsubscribed' }),
    ],
    issues: [
      makeIssue({ id: '1', status: 'sent', sentAt: '2026-10-01T08:00:00Z', stats: { recipients: 10, opens: 5, clicks: 1 } }),
      makeIssue({ id: '2', status: 'sent', sentAt: '2026-10-15T08:00:00Z', stats: { recipients: 10, opens: 7, clicks: 3 } }),
      makeIssue({ id: '3' }),
    ],
  })
})

describe('stats', () => {
  it('summarises subscribers and sent issues', async () => {
    const body = await (await app.request('/api/stats')).json()

    expect(body).toEqual({
      activeSubscribers: 2,
      paidSubscribers: 1,
      issuesSent: 2,
      openRate: 0.6,
      clickRate: 0.2,
      lastSentAt: '2026-10-15T08:00:00Z',
    })
  })
})
