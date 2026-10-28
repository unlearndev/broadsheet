import { v4 as uuid } from 'uuid'

/** A unique Message-ID for each email we send, so replies and bounces can be matched up. */
export function newMessageId(): string {
  return `<${uuid()}@weeklybrief.example>`
}
