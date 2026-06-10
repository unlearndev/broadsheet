import { beforeEach, describe, expect, it } from 'vitest'
import { clearOutbox, outboxEmails } from '../lib/mailer'
import { db, useMemoryDb } from '../store/db'
import { makeIssue, makeSubscriber } from '../test/fixtures'
import job from './send-scheduled-issues'


beforeEach(() => {
  clearOutbox()
  useMemoryDb({
    subscribers: [makeSubscriber()],
    issues: [
      makeIssue({ id: 'due', title: 'Due', status: 'scheduled', scheduledFor: '2020-01-01T08:00:00Z' }),
      makeIssue({ id: 'later', title: 'Later', status: 'scheduled', scheduledFor: '2099-01-01T08:00:00Z' }),
      makeIssue({ id: 'draft', title: 'Draft' }),
    ],
  })
})

describe('send-scheduled-issues', () => {
  it('sends issues whose time has come', async () => {
    await job.run()

    expect(outboxEmails().map((email) => email.subject)).toEqual(['Due'])
    expect(db().issues.find((issue) => issue.id === 'due')?.status).toBe('sent')
  })

  it('leaves future and draft issues alone', async () => {
    await job.run()

    expect(db().issues.find((issue) => issue.id === 'later')?.status).toBe('scheduled')
    expect(db().issues.find((issue) => issue.id === 'draft')?.status).toBe('draft')
  })
})
