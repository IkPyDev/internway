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

- Rules: [AGENTS.md](AGENTS.md)
- Shape and reasoning: [ARCHITECTURE.md](ARCHITECTURE.md)
- Claude Code workflow: [CLAUDE.md](CLAUDE.md)
