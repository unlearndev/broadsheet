import { PUBLICATION } from '../../../shared/publication'
import { escapeHtml, layout } from '../layout'
import type { Template } from '../types'

export const welcomeEmail: Template = ({ subscriber, unsubscribeUrl }) => {
  const greeting = subscriber.name ? `Hi ${escapeHtml(subscriber.name)},` : 'Hi there,'

  return {
    subject: `Welcome to ${PUBLICATION}`,
    html: layout(
      `<p>${greeting}</p>
<p>Thanks for subscribing. A new issue lands every other Thursday morning.</p>
<p>If you ever want to stop, there’s a link at the bottom of every email.</p>`,
      unsubscribeUrl,
    ),
    text: `${subscriber.name ? `Hi ${subscriber.name},` : 'Hi there,'}\n\nThanks for subscribing. A new issue lands every other Thursday morning.\n\nUnsubscribe: ${unsubscribeUrl}`,
  }
}
