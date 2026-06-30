import { sendTemplate } from '../emails/render'
import { subscribers } from '../store/SubscriberRepository'
import type { Job } from './loader'

const job: Job = {
  name: 'renewal-reminders',
  // 9am on 1 December
  schedule: '0 9 1 12 *',
  async run() {
    for (const subscriber of subscribers.paid()) {
      await sendTemplate('renewal-reminder', subscriber, { renewsAt: subscriber.renewsAt })
    }
  },
}

export default job
