import { describe, expect, it } from 'vitest'
import { makeSubscriber } from '../test/fixtures'
import { normalizeSubscriber } from './normalizeSubscriber'

describe('normalizeSubscriber', () => {
  it('leaves migrated subscribers alone', () => {
    const subscriber = makeSubscriber({ status: 'unsubscribed' })

    expect(normalizeSubscriber(subscriber)).toEqual(subscriber)
  })

  it('maps the old isActive flag to a status', () => {
    const { status: _, ...rest } = makeSubscriber()

    expect(normalizeSubscriber({ ...rest, isActive: true }).status).toBe('active')
    expect(normalizeSubscriber({ ...rest, isActive: false }).status).toBe('unsubscribed')
  })

  it('drops the old field', () => {
    const { status: _, ...rest } = makeSubscriber()

    expect(normalizeSubscriber({ ...rest, isActive: true })).not.toHaveProperty('isActive')
  })
})
