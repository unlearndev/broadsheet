import { layout } from '../layout'
import type { Template } from '../types'

export const renewalReminderEmail: Template = ({ renewsAt, unsubscribeUrl }) => {
  const date = renewsAt
    ? new Date(renewsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '1 January'

  return {
    subject: `Your plan renews on ${date}`,
    html: layout(
      `<p>A heads-up: your annual plan renews on <strong>${date}</strong>.</p>
<p>Nothing to do if you’re staying. If you’d rather not renew, reply to this email before then and we’ll cancel it.</p>`,
      unsubscribeUrl,
    ),
    text: `A heads-up: your annual plan renews on ${date}.\n\nNothing to do if you're staying. If you'd rather not renew, reply before then and we'll cancel it.\n\nUnsubscribe: ${unsubscribeUrl}`,
  }
}
