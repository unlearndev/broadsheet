import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import type { Issue, Subscriber } from '../../shared/types'

export interface Data {
  subscribers: Subscriber[]
  issues: Issue[]
}

let data: Data = { subscribers: [], issues: [] }
let file: string | null = null

export function loadDb(path: string, seedPath = 'data/seed.json'): void {
  file = path
  data = JSON.parse(readFileSync(existsSync(path) ? path : seedPath, 'utf8')) as Data
  save()
}

export function useMemoryDb(initial: Partial<Data> = {}): void {
  file = null
  data = { subscribers: [], issues: [], ...structuredClone(initial) }
}

export function db(): Data {
  return data
}

export function save(): void {
  if (!file) return
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, JSON.stringify(data, null, 2))
}
