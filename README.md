# Broadsheet

A small newsletter app: write issues, manage subscribers, send.

> This is the demo app for the **Subtractive Engineering** workshop from [Unlearn](https://unlearn.dev).
> `ops/` holds exports from production (route hits, job runs, flag values).

## Stack

- **API:** [Hono](https://hono.dev) on Node, run with `tsx`
- **Dashboard:** React + Vite
- **Data:** a JSON file (`data/db.json`), created from `data/seed.json` on first run
- **Tests:** Vitest

## Getting started

Requires Node 22.12 or newer.

```bash
npm install
npm run dev
```

The dashboard runs on http://localhost:5173 and the API on http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | API and dashboard with hot reload |
| `npm test` | Run the tests |
| `npm run typecheck` | Type-check everything |
| `npm run check` | Typecheck, tests and build. Run this before you push. |
| `npm run seed` | Reset `data/db.json` from the seed data |
