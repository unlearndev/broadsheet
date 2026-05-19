import type { Subscriber } from '../../shared/types'
import { deliver } from '../lib/mailer'
import type { Notification, NotificationChannel } from './NotificationChannel'

export class EmailChannel implements NotificationChannel {
  readonly name = 'email'

  async send(to: Subscriber, notification: Notification): Promise<void> {
    await deliver({ to: to.email, ...notification })
  }
}
