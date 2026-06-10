export const env = {
  port: Number(process.env.PORT ?? 3000),
  appUrl: process.env.APP_URL ?? 'http://localhost:5173',
  dataFile: process.env.DATA_FILE ?? 'data/db.json',
  paymentsWebhookSecret: process.env.PAYMENTS_WEBHOOK_SECRET ?? 'dev-secret',
}
