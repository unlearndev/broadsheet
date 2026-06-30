import type { Issue, Subscriber } from '../../shared/types'

export interface TemplateData {
  subscriber: Subscriber
  unsubscribeUrl: string
  issue?: Issue
  renewsAt?: string | null
}

export interface RenderedEmail {
  subject: string
  html: string
  text: string
}

export type Template = (data: TemplateData) => RenderedEmail
