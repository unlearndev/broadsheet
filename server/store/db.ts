import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { Issue, Subscriber } from '../../shared/types'
import { normalizeSubscriber } from '../lib/normalizeSubscriber'

export interface ProcessedEvent {
  id: string
  receivedAt: string
}

export interface Data {
  subscribers: Subscriber[]
  issues: Issue[]
  processedEvents: ProcessedEvent[]
}

const empty = (): Data => ({ subscribers: [], issues: [], processedEvents: [] })

let data: Data = empty()
let file: string | null = null

export function loadDb(path: string, seedPath = 'data/seed.json'): void {
  file = path
  const raw = JSON.parse(readFileSync(existsSync(path) ? path : seedPath, 'utf8')) as Partial<Data>
  data = { ...empty(), ...raw, subscribers: (raw.subscribers ?? []).map(normalizeSubscriber) }
  save()
}

export function useMemoryDb(initial: Partial<Data> = {}): void {
  file = null
  data = { ...empty(), ...structuredClone(initial) }
}

export function db(): Data {
  return data
}

export function save(): void {
  if (!file) return
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(data, null, 2))
}
