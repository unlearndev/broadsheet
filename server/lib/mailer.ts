export interface OutgoingEmail {
  to: string
  subject: string
  html: string
  text: string
}

const outbox: OutgoingEmail[] = []

/**
 * Development transport: keeps mail in memory and logs it.
 * Swap this for the real provider's SDK in production.
 */
export async function deliver(email: OutgoingEmail): Promise<void> {
  outbox.push(email)
  if (process.env.NODE_ENV !== 'test') console.log(`[mail] to ${email.to}: ${email.subject}`)
}

export function outboxEmails(): OutgoingEmail[] {
  return [...outbox]
}

export function clearOutbox(): void {
  outbox.length = 0
}
