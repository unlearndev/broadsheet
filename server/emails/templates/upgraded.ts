import { layout } from '../layout'
import type { Template } from '../types'

export const upgradedEmail: Template = ({ unsubscribeUrl }) => ({
  subject: 'You’re now a paid subscriber',
  html: layout(
    `<p>Thank you. Seriously.</p>
<p>Your support pays for the time that goes into every issue. You’ll get the paid-only deep dives from the next issue on.</p>`,
    unsubscribeUrl,
  ),
  text: `Thank you. Your support pays for the time that goes into every issue. You'll get the paid-only deep dives from the next issue on.\n\nUnsubscribe: ${unsubscribeUrl}`,
})
