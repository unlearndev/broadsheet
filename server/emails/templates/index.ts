import { issueEmail } from './issue'
import { welcomeEmail } from './welcome'

export const templates = {
  issue: issueEmail,
  welcome: welcomeEmail,
}

export type TemplateName = keyof typeof templates
