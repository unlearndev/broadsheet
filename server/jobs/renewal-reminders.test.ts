import { beforeEach, describe, expect, it } from 'vitest'
import { clearOutbox, outboxEmails } from '../lib/mailer'
import { useMemoryDb } from '../store/db'
import { makeSubscriber } from '../test/fixtures'
import job from './renewal-reminders'

beforeEach(() => {
  clearOutbox()
  useMemoryDb({
    subscribers: [
      makeSubscriber({ id: 'paid', email: 'paid@example.com', tier: 'paid', renewsAt: '2027-01-01T00:00:00Z' }),
      makeSubscriber({ id: 'free', email: 'free@example.com' }),
      makeSubscriber({ id: 'gone', email: 'gone@example.com', tier: 'paid', isActive: false }),
    ],
  })
})

describe('renewal-reminders', () => {
  it('reminds active paid subscribers', async () => {
    await job.run()

    expect(outboxEmails().map((email) => email.to)).toEqual(['paid@example.com'])
    expect(outboxEmails()[0].subject).toBe('Your plan renews on 1 January 2027')
  })
})
