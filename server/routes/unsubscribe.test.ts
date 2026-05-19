import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { db, useMemoryDb } from '../store/db'

const app = createApp()

beforeEach(() => {
  useMemoryDb({
    subscribers: [
      { id: 'sub_1', email: 'ada@example.com', name: 'Ada', isActive: true, token: 'tok_ada', createdAt: '2026-01-01T00:00:00Z' },
    ],
  })
})

describe('unsubscribe links', () => {
  it('unsubscribes the person the link belongs to', async () => {
    const res = await app.request('/u/tok_ada')

    expect(res.status).toBe(200)
    expect(await res.text()).toContain('You’re unsubscribed')
    expect(db().subscribers[0].isActive).toBe(false)
  })

  it('shows a friendly page for an unknown token', async () => {
    const res = await app.request('/u/nope')

    expect(res.status).toBe(404)
    expect(db().subscribers[0].isActive).toBe(true)
  })
})
