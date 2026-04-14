import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { useMemoryDb } from '../store/db'

const app = createApp()

beforeEach(() => {
  useMemoryDb()
})

describe('issues', () => {
  it('creates a draft issue', async () => {
    const res = await app.request('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Hello', body: 'First issue' }),
    })

    expect(res.status).toBe(201)
    expect(await res.json()).toMatchObject({ title: 'Hello', status: 'draft' })
  })

  it('requires a title', async () => {
    const res = await app.request('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: '  ' }),
    })

    expect(res.status).toBe(422)
  })

  it('lists issues newest first', async () => {
    useMemoryDb({
      issues: [
        { id: 'a', title: 'Old', body: '', status: 'sent', scheduledFor: null, sentAt: null, createdAt: '2026-01-01T00:00:00Z' },
        { id: 'b', title: 'New', body: '', status: 'draft', scheduledFor: null, sentAt: null, createdAt: '2026-02-01T00:00:00Z' },
      ],
    })

    const res = await app.request('/api/issues')
    const body = (await res.json()) as { id: string }[]

    expect(body.map((issue) => issue.id)).toEqual(['b', 'a'])
  })
})
