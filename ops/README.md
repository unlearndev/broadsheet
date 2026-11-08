# ops/

Exports from production, pulled on 8 November 2026. They're here so you can check what actually
runs without logging in to the real dashboards. In your own project this evidence lives in your
logs, APM, analytics and feature-flag service.

| File | What's in it |
| --- | --- |
| `route-hits-last-30-days.csv` | Requests per route, 10 Oct to 8 Nov 2026, and where they came from |
| `job-runs-last-30-days.csv` | Every background job that ran in the same window |
| `flags-production.json` | Current feature-flag values in production |
