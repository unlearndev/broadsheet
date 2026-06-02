import { beforeEach, describe, expect, it } from 'vitest'
import { clearOutbox, outboxEmails } from '../lib/mailer'
import { db, useMemoryDb } from '../store/db'
import job from './send-scheduled-issues'

const subscriber = { id: 'sub_1', email: 'ada@example.com', name: 'Ada', isActive: true, token: 'tok', createdAt: '2026-01-01T00:00:00Z' }
const base = { body: 'Hi', sentAt: null, createdAt: '2026-01-01T00:00:00Z' }

beforeEach(() => {
  clearOutbox()
  useMemoryDb({
    subscribers: [subscriber],
    issues: [
      { ...base, id: 'due', title: 'Due', status: 'scheduled', scheduledFor: '2020-01-01T08:00:00Z' },
      { ...base, id: 'later', title: 'Later', status: 'scheduled', scheduledFor: '2099-01-01T08:00:00Z' },
      { ...base, id: 'draft', title: 'Draft', status: 'draft', scheduledFor: null },
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
