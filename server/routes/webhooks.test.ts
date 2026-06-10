import { beforeEach, describe, expect, it } from 'vitest'
import { createApp } from '../app'
import { clearOutbox, outboxEmails } from '../lib/mailer'
import { db, useMemoryDb } from '../store/db'
import { makeSubscriber } from '../test/fixtures'
import { sign } from './webhooks'

const app = createApp()

function post(event: object, signature?: string) {
  const payload = JSON.stringify(event)
  return app.request('/webhooks/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-signature': signature ?? sign(payload) },
    body: payload,
  })
}

const created = {
  id: 'evt_1',
  type: 'subscription.created',
  data: { email: 'ada@example.com', renewsAt: '2027-01-01T00:00:00Z' },
}

beforeEach(() => {
  clearOutbox()
  useMemoryDb({ subscribers: [makeSubscriber()] })
})

describe('payment webhooks', () => {
  it('upgrades the subscriber and thanks them', async () => {
    const res = await post(created)

    expect(res.status).toBe(200)
    expect(db().subscribers[0]).toMatchObject({ tier: 'paid', renewsAt: '2027-01-01T00:00:00Z' })
    expect(outboxEmails().map((email) => email.subject)).toEqual(['You’re now a paid subscriber'])
  })

  it('rejects a bad signature', async () => {
    const res = await post(created, 'nope')

    expect(res.status).toBe(401)
    expect(db().subscribers[0].tier).toBe('free')
  })

  it('downgrades on cancellation', async () => {
    await post(created)
    await post({ id: 'evt_2', type: 'subscription.cancelled', data: { email: 'ada@example.com' } })

    expect(db().subscribers[0]).toMatchObject({ tier: 'free', renewsAt: null })
  })
})
