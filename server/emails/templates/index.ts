import { issueEmail } from './issue'
import { upgradedEmail } from './upgraded'
import { welcomeEmail } from './welcome'

export const templates = {
  issue: issueEmail,
  welcome: welcomeEmail,
  upgraded: upgradedEmail,
}

export type TemplateName = keyof typeof templates
