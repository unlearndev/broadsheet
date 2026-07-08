import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { db, useMemoryDb } from '../store/db'
import { makeSubscriber } from '../test/fixtures'

const app = createApp()

beforeEach(() => {
  useMemoryDb({
    subscribers: [makeSubscriber({ token: 'tok_ada' })],
  })
})

describe('unsubscribe links', () => {
  it('unsubscribes the person the link belongs to', async () => {
    const res = await app.request('/u/tok_ada')

    expect(res.status).toBe(200)
    expect(await res.text()).toContain('You’re unsubscribed')
    expect(db().subscribers[0].status).toBe('unsubscribed')
  })

  it('shows a friendly page for an unknown token', async () => {
    const res = await app.request('/u/nope')

    expect(res.status).toBe(404)
    expect(db().subscribers[0].status).toBe('active')
  })
})
