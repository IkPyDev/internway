# InternWay

International internships for students from Uzbekistan — one place, updated daily.

```bash
corepack enable          # once per machine, provides pnpm
pnpm install
pnpm setup:py            # Python venv for the Excel import
cp .env.example .env      # set VITE_CONTACT_EMAIL to enable the contact forms
pnpm dev                  # http://localhost:5173
pnpm gate                 # everything CI would check
pnpm collect              # refresh internships (Python 3)
```

Accounts, vacancies and applications need the API: [`IkPyDev/internway_back`](https://github.com/IkPyDev/internway_back), cloned next to this repo
and started with its `pnpm db && pnpm dev` (port 3000; `pnpm dev` here proxies `/api` to it).

## Demo data

While `OTP_DEMO_CODE` is set, an empty database is filled from the API's `src/seed.sql` on the
first server start (fictional companies, vacancies, resumes and applications). Sign in
with any of these emails and the demo code; `pnpm db:reset` and a server restart bring
the data back.

| Email | Who |
| --- | --- |
| `hr@silkroad.test` | owner, Silk Road Tech (IT); `recruiter@silkroad.test` is its manager |
| `hr@tashkentdigital.test` | owner, Tashkent Digital Agency (marketing) |
| `hr@samarkandhotels.test` | owner, Samarkand Hospitality Group (hotels) |
| `hr@orientlogistics.test` | owner, Orient Logistics |
| `hr@berlinbridge.test` | owner, Berlin Bridge GmbH (Germany) |
| `hr@aurora.test` | owner, Aurora Analytics — company still waiting for verification |
| `dilshod@student.test` `madina@student.test` `otabek@student.test` `nilufar@student.test` | students with approved resumes and applications |
| `sherzod@student.test` | student, resume waiting for moderation |
| `laylo@student.test` | student without a resume |
| the API server's `ADMIN_EMAIL` | admin |

## Deploy (Vercel)

1. Push this repo to GitHub (private is fine).
2. Vercel → Add New → Project → pick the repo. Vite and pnpm are detected; `vercel.json` adds the SPA fallback.
3. Vercel → Settings → Environment Variables → `VITE_CONTACT_EMAIL`.
4. Every push to `main` redeploys. `.github/workflows/collect.yml` refreshes the data daily at 08:00 Tashkent and pushes it; `gate.yml` runs `pnpm gate` on every push.

- Rules: [AGENTS.md](AGENTS.md)
- Shape and reasoning: [ARCHITECTURE.md](ARCHITECTURE.md)
- Claude Code workflow: [CLAUDE.md](CLAUDE.md)
