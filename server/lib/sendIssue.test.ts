import { beforeEach, describe, expect, it } from 'vitest'
import { db, useMemoryDb } from '../store/db'
import { makeIssue, makeSubscriber } from '../test/fixtures'
import { clearOutbox, outboxEmails } from './mailer'
import { sendIssue } from './sendIssue'

beforeEach(() => {
  clearOutbox()
  useMemoryDb({
    subscribers: [
      makeSubscriber({ id: 'sub_1', email: 'ada@example.com', token: 'tok_ada' }),
      makeSubscriber({ id: 'sub_2', email: 'bo@example.com', isActive: false, token: 'tok_bo' }),
    ],
    issues: [makeIssue()],
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
