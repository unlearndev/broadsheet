import { useMemo } from 'react'
import type { Subscriber } from '../../../shared/types'

/** Filters the loaded subscribers by email or name as you type. */
export function useSubscriberSearch(subscribers: Subscriber[], query: string): Subscriber[] {
  return useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return subscribers

    return subscribers.filter(
      (subscriber) =>
        subscriber.email.includes(needle) || (subscriber.name ?? '').toLowerCase().includes(needle),
    )
  }, [subscribers, query])
}
