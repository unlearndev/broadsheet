import type { Subscriber } from '../../shared/types'

type StoredSubscriber = Omit<Subscriber, 'status'> & {
  status?: Subscriber['status']
  /** Old field, replaced by `status`. */
  isActive?: boolean
}

// TODO: remove once every subscriber has been migrated to `status`
export function normalizeSubscriber(stored: StoredSubscriber): Subscriber {
  if (stored.status) return stored as Subscriber

  const { isActive, ...rest } = stored
  return { ...rest, status: isActive === false ? 'unsubscribed' : 'active' }
}
