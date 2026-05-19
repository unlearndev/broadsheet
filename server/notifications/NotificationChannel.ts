import type { Subscriber } from '../../shared/types'

export interface Notification {
  subject: string
  html: string
  text: string
}

/**
 * A way of reaching a subscriber. Email for now, with room for SMS,
 * push or Slack later without touching the sending code.
 */
export interface NotificationChannel {
  readonly name: string
  send(to: Subscriber, notification: Notification): Promise<void>
}
