import { afterEach, describe, expect, it } from 'vitest'
import { getFlags } from './flags'

afterEach(() => {
  delete process.env.FLAGS_JSON
})

describe('getFlags', () => {
  it('uses the defaults from config/flags.json', () => {
    expect(getFlags()).toEqual({ newEditor: false })
  })

  it('lets the environment override a flag', () => {
    process.env.FLAGS_JSON = '{"newEditor": true}'

    expect(getFlags().newEditor).toBe(true)
  })
})
