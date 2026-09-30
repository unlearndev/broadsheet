import { describe, expect, it } from 'vitest'
import { slugify } from './slug'

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('The Tools We Actually Use')).toBe('the-tools-we-actually-use')
  })

  it('strips accents rather than dropping letters', () => {
    expect(slugify('Café Society')).toBe('cafe-society')
  })

  it('trims stray punctuation', () => {
    expect(slugify('  Hello, world!  ')).toBe('hello-world')
  })
})
