import { issueEmail } from './issue'
import { renewalReminderEmail } from './renewal-reminder'
import { upgradedEmail } from './upgraded'
import { welcomeEmail } from './welcome'

export const templates = {
  issue: issueEmail,
  welcome: welcomeEmail,
  upgraded: upgradedEmail,
  'renewal-reminder': renewalReminderEmail,
}

export type TemplateName = keyof typeof templates
