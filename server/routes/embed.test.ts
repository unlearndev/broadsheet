import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { db, useMemoryDb } from '../store/db'

const app = createApp()

beforeEach(() => {
  useMemoryDb()
})

describe('embed signup', () => {
  it('subscribes from another origin', async () => {
    const res = await app.request('/api/embed/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: 'https://blog.example.org' },
      body: JSON.stringify({ email: 'reader@example.org' }),
    })

    expect(res.status).toBe(200)
    expect(res.headers.get('access-control-allow-origin')).toBe('*')
    expect(db().subscribers.map((s) => s.email)).toEqual(['reader@example.org'])
  })

  it('accepts a plain form post', async () => {
    const res = await app.request('/api/embed/subscribe', {
      method: 'POST',
      body: new URLSearchParams({ email: 'form@example.org' }),
    })

    expect(await res.json()).toMatchObject({ ok: true })
  })

  it('gives the same answer for an existing subscriber', async () => {
    const first = await app.request('/api/embed/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'reader@example.org' }),
    })
    const second = await app.request('/api/embed/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'reader@example.org' }),
    })

    expect(await second.json()).toEqual(await first.json())
  })
})
