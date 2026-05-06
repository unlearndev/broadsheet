import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { db, useMemoryDb } from '../store/db'

const app = createApp()

function subscribe(body: object) {
  return app.request('/api/subscribers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

beforeEach(() => {
  useMemoryDb()
})

describe('subscribing', () => {
  it('adds a subscriber', async () => {
    const res = await subscribe({ email: 'Ada@Example.com', name: 'Ada' })

    expect(res.status).toBe(201)
    expect(db().subscribers).toHaveLength(1)
    expect(db().subscribers[0].email).toBe('ada@example.com')
  })

  it('rejects an invalid email', async () => {
    const res = await subscribe({ email: 'not-an-email' })

    expect(res.status).toBe(422)
    expect(db().subscribers).toHaveLength(0)
  })

  it('does not create duplicates', async () => {
    await subscribe({ email: 'ada@example.com' })
    await subscribe({ email: 'ADA@example.com' })

    expect(db().subscribers).toHaveLength(1)
  })
})
