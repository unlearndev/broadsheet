import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { useMemoryDb } from '../store/db'
import { makeIssue } from '../test/fixtures'

const app = createApp()

beforeEach(() => {
  useMemoryDb({
    issues: [
      makeIssue({ id: 'sent', title: 'Café Society', slug: 'cafe-society', status: 'sent' }),
      makeIssue({ id: 'draft', title: 'Secret', slug: 'secret' }),
    ],
  })
})

describe('web archive', () => {
  it('shows a sent issue by its slug', async () => {
    const res = await app.request('/p/cafe-society')

    expect(res.status).toBe(200)
    expect(await res.text()).toContain('<h1>Café Society</h1>')
  })

  it('never shows drafts', async () => {
    const res = await app.request('/p/secret')

    expect(res.status).toBe(404)
  })
})
