# 2026-06-14: Paid subscribers got two or three "You're now a paid subscriber" emails

## What happened

Between 09:10 and 11:40 on Saturday 14 June, 23 people who upgraded got the upgrade email
two or three times. Two of them emailed to ask if they'd been charged twice. They hadn't.

## Why

The payment provider expects a 2xx within 5 seconds. During a slow spell on our host, some
webhook requests took longer than that, so the provider retried them. Each retry carries the
**same event id**, and we processed every delivery as if it were new: upgrade the subscriber
(harmless, same result) and send the upgrade email (not harmless).

The provider's docs say: "Webhooks are delivered at least once. Your endpoint must be
idempotent; use the event id to ignore duplicates."

## Fix

- Remember the id of every processed event and ignore any event we've already seen
  (`server/routes/webhooks.ts`, `server/store/events.ts`).
- Keep ids for 30 days (`prune-processed-events` job). The provider stops retrying after 72 hours.
- Test: "ignores a retried event".

## Follow-up

- Apologised to the 23 subscribers.
