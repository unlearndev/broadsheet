import { describe, expect, it } from 'vitest'
import { makeSubscriber } from '../../test/fixtures'
import { subscriberCsvLines } from './streamCsv'

describe('subscriberCsvLines', () => {
  it('yields a header and one line per subscriber', () => {
    const lines = [...subscriberCsvLines([makeSubscriber(), makeSubscriber({ email: 'bo@example.com', name: null })])]

    expect(lines).toEqual([
      'email,name,status,tier,createdAt\r\n',
      'ada@example.com,Ada,active,free,2026-01-01T00:00:00Z\r\n',
      'bo@example.com,,active,free,2026-01-01T00:00:00Z\r\n',
    ])
  })

  it('quotes commas, quotes and newlines', () => {
    const [, line] = subscriberCsvLines([makeSubscriber({ name: 'Ada "The Countess", Lovelace' })])

    expect(line).toContain('"Ada ""The Countess"", Lovelace"')
  })
})
