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

describe('searching', () => {
  it('matches email or name, case-insensitively', async () => {
    await subscribe({ email: 'ada@example.com', name: 'Ada Lovelace' })
    await subscribe({ email: 'grace@example.com', name: 'Grace Hopper' })

    const byName = (await (await app.request('/api/subscribers?q=LOVELACE')).json()) as { email: string }[]
    const byEmail = (await (await app.request('/api/subscribers?q=grace@')).json()) as { email: string }[]

    expect(byName.map((s) => s.email)).toEqual(['ada@example.com'])
    expect(byEmail.map((s) => s.email)).toEqual(['grace@example.com'])
  })
})

describe('exporting', () => {
  it('downloads every subscriber as CSV', async () => {
    await subscribe({ email: 'ada@example.com', name: 'Ada' })

    const res = await app.request('/api/subscribers/export')
    const csv = await res.text()

    expect(res.headers.get('content-type')).toContain('text/csv')
    expect(csv.split('\r\n')[0]).toBe('email,name,status,tier,createdAt')
    expect(csv).toContain('ada@example.com,Ada,active,free,')
  })
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
