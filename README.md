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

## Deploy (Vercel)

1. Push this repo to GitHub (private is fine).
2. Vercel → Add New → Project → pick the repo. Vite and pnpm are detected; `vercel.json` adds the SPA fallback.
3. Vercel → Settings → Environment Variables → `VITE_CONTACT_EMAIL`.
4. Every push to `main` redeploys. `.github/workflows/collect.yml` refreshes the data daily at 08:00 Tashkent and pushes it; `gate.yml` runs `pnpm gate` on every push.

- Rules: [AGENTS.md](AGENTS.md)
- Shape and reasoning: [ARCHITECTURE.md](ARCHITECTURE.md)
- Claude Code workflow: [CLAUDE.md](CLAUDE.md)
