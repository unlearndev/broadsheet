import type { Subscriber } from '../../../shared/types'

const HEADER = ['email', 'name', 'status', 'tier', 'createdAt']

function cell(value: string): string {
  return /[",\r\n]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value
}

/** Yields the export one line at a time, so big lists never sit in memory as one string. */
export function* subscriberCsvLines(subscribers: Iterable<Subscriber>): Generator<string> {
  yield `${HEADER.join(',')}\r\n`

  for (const subscriber of subscribers) {
    const row = [subscriber.email, subscriber.name ?? '', subscriber.status, subscriber.tier, subscriber.createdAt]
    yield `${row.map(cell).join(',')}\r\n`
  }
}
