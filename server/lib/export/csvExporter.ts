import Papa from 'papaparse'
import type { Subscriber } from '../../../shared/types'

export const EXPORT_COLUMNS = ['email', 'name', 'status', 'tier', 'createdAt'] as const

export function exportSubscribersCsv(subscribers: Subscriber[]): string {
  return Papa.unparse(
    subscribers.map((subscriber) => ({
      email: subscriber.email,
      name: subscriber.name ?? '',
      status: subscriber.status,
      tier: subscriber.tier,
      createdAt: subscriber.createdAt,
    })),
    { columns: [...EXPORT_COLUMNS] },
  )
}
