import { describe, expect, it } from 'vitest'
import { makeSubscriber } from '../../test/fixtures'
import { exportSubscribersCsv } from './csvExporter'

describe('exportSubscribersCsv', () => {
  it('writes a header row and one row per subscriber', () => {
    const csv = exportSubscribersCsv([makeSubscriber(), makeSubscriber({ id: 'sub_2', email: 'bo@example.com', name: null })])

    expect(csv.split('\r\n')).toEqual([
      'email,name,status,tier,createdAt',
      'ada@example.com,Ada,active,free,2026-01-01T00:00:00Z',
      'bo@example.com,,active,free,2026-01-01T00:00:00Z',
    ])
  })

  it('quotes values with commas', () => {
    const csv = exportSubscribersCsv([makeSubscriber({ name: 'Lovelace, Ada' })])

    expect(csv).toContain('"Lovelace, Ada"')
  })
})
