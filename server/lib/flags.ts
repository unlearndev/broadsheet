import { readFileSync } from 'node:fs'

export interface Flags {
  newEditor: boolean
}

/**
 * Defaults live in config/flags.json. Each environment can override them with
 * FLAGS_JSON, which the flag service writes when someone flips a flag.
 */
export function getFlags(): Flags {
  const defaults = JSON.parse(readFileSync('config/flags.json', 'utf8')) as Flags
  const overrides = process.env.FLAGS_JSON ? (JSON.parse(process.env.FLAGS_JSON) as Partial<Flags>) : {}

  return { ...defaults, ...overrides }
}
