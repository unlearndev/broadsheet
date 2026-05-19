import type { Subscriber } from '../../shared/types'
import { env } from '../env'
import { deliver } from '../lib/mailer'
import { templates, type TemplateName } from './templates'
import type { RenderedEmail, TemplateData } from './types'

export function unsubscribeUrl(subscriber: Subscriber): string {
  return `${env.appUrl}/u/${subscriber.token}`
}

export function renderTemplate(
  name: TemplateName,
  subscriber: Subscriber,
  data: Partial<TemplateData> = {},
): RenderedEmail {
  return templates[name]({ subscriber, unsubscribeUrl: unsubscribeUrl(subscriber), ...data })
}

export async function sendTemplate(
  name: TemplateName,
  subscriber: Subscriber,
  data: Partial<TemplateData> = {},
): Promise<void> {
  await deliver({ to: subscriber.email, ...renderTemplate(name, subscriber, data) })
}
