import { db, save } from './db'

export const events = {
  seen(id: string): boolean {
    return db().processedEvents.some((event) => event.id === id)
  },

  remember(id: string): void {
    db().processedEvents.push({ id, receivedAt: new Date().toISOString() })
    save()
  },

  pruneOlderThan(days: number): number {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000
    const before = db().processedEvents.length
    db().processedEvents = db().processedEvents.filter((event) => Date.parse(event.receivedAt) >= cutoff)
    save()
    return before - db().processedEvents.length
  },
}
