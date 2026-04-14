# Broadsheet

Newsletter app. Hono API in `server/`, React dashboard in `client/`, types shared between them in `shared/`.

## Commands

- `npm run dev`: API on :3000, dashboard on :5173
- `npm run check`: typecheck, tests and build. Run it before you say you're done.

## Conventions

- One Hono router per area in `server/routes`, mounted in `server/app.ts`.
- All data access goes through `server/store`. Never read or write `data/db.json` directly.
- Keep components small. Pages live in `client/src/pages`, shared pieces in `client/src/components`.
