import { beforeEach, describe, expect, it } from 'vitest'
import { db, useMemoryDb } from '../store/db'
import { clearOutbox, outboxEmails } from './mailer'
import { sendIssue } from './sendIssue'

beforeEach(() => {
  clearOutbox()
  useMemoryDb({
    subscribers: [
      { id: 'sub_1', email: 'ada@example.com', name: 'Ada', isActive: true, token: 'tok_ada', createdAt: '2026-01-01T00:00:00Z' },
      { id: 'sub_2', email: 'bo@example.com', name: null, isActive: false, token: 'tok_bo', createdAt: '2026-01-01T00:00:00Z' },
    ],
    issues: [
      { id: 'iss_1', title: 'Hello', body: 'First.\n\nSecond.', status: 'draft', scheduledFor: null, sentAt: null, createdAt: '2026-01-01T00:00:00Z' },
    ],
  })
})

describe('sendIssue', () => {
  it('emails active subscribers only', async () => {
    const result = await sendIssue(db().issues[0])

    expect(result).toEqual({ sent: 1, failed: 0 })
    expect(outboxEmails().map((email) => email.to)).toEqual(['ada@example.com'])
  })

  it('includes an unsubscribe link', async () => {
    await sendIssue(db().issues[0])

    expect(outboxEmails()[0].html).toContain('/u/tok_ada')
  })

  it('marks the issue as sent', async () => {
    await sendIssue(db().issues[0])

    expect(db().issues[0].status).toBe('sent')
    expect(db().issues[0].sentAt).not.toBeNull()
  })
})
