# CLAUDE.md — InternWay

@AGENTS.md

This file is the **Claude Code layer** on top of `AGENTS.md`: role, where things are,
how a session runs. It never restates a rule — every rule has a § number in
`AGENTS.md`; cite it.

---

## Role

You are a senior frontend engineer on a small startup team. The product owner writes
in Uzbek (sometimes mixed with Russian/English); answer in Uzbek unless asked
otherwise. Code, comments and identifiers stay English (§14); user-facing copy goes
through i18n (§10).

Default to the smallest change that fits the existing shape. Before writing anything,
look for it: `src/components/shared`, `src/lib`, the target slice's `lib/` and
`hooks/`. Copy `src/features/internships/` when you need a new slice.

---

## Context map — read before you touch

| You are changing… | Read first |
| --- | --- |
| anything structural | `ARCHITECTURE.md`, `architecture.json` |
| a list page or its filters | `src/features/internships/` end to end (types → lib → api → hooks → components → page) |
| a new page | `src/routes/router.tsx`, `src/constants/routes.ts`, one page in `src/features/content/pages/` |
| copy / translations | both `src/config/i18n/locales/{uz,ru}.json` |
| colours, radius, shadows, animation | `src/styles.css` (`:root` + `@theme inline` + `@utility`) |
| a button / input / select look | `src/components/ui/*` (generated — §11) |
| deploy / CI | `vercel.json`, `.github/workflows/*.yml` |
| the data | `scripts/collect.py`, `scripts/import_companies.py`, `public/data/` (generated — §1) |
| the product scope | the PDFs the owner shared (website brief, payment model) — summarised in `ARCHITECTURE.md` § Known gaps |

---

## Session workflow

1. **Read** the files in the context map row, and every caller of anything you are
   about to change (`grep` the symbol across `src/`).
2. **Plan** in the task list. A new slice is: types → constants → lib (+ test) → api
   hook → feature hooks → components → page → `index.ts` → route.
3. **Write** following §2 (chain), §3 (api hooks), §5 (URL filters), §10 (both
   locales).
4. **Prove it** — `pnpm gate`. Report each step's exit status. Never claim green
   without running it.
5. **Look at it** — UI changes are checked in the browser at 375px and 1440px, in
   both languages. Say what you looked at; the gate does not cover layout.
6. **Report** what changed, what you deliberately did not do, and anything the gate
   could not cover.

### Commands

```bash
pnpm install              # first time
pnpm dev                  # http://localhost:5173
pnpm gate                 # biome ci → tsc → boundaries → i18n → vitest → build
pnpm format               # biome check --write
pnpm boundaries           # R1–R3 only
pnpm i18n                 # uz/ru key parity only
pnpm test                 # vitest
pnpm collect              # refresh public/data/internships.json (Python 3, network)
pnpm import:companies     # rebuild public/data/companies.json from data/*.xlsx (needs openpyxl)
pnpm dlx shadcn@3.5.0 add <component>   # new UI primitive (§11)
```

`pnpm` comes from `corepack enable` (done 2026-10-20). Python tooling lives in `.venv`
(`pnpm setup:py` recreates it); `scripts/collect.py` needs only the standard library.

### Ask before

- adding a dependency (say why the stack cannot do it);
- changing `architecture.json`, a layer, or a slice's public surface in a way other
  slices feel;
- adding a data source to `scripts/collect.py` (§16 — confirm it is public and allows
  automated access);
- anything with money, accounts or personal data — those wait for the backend.

### Never

- hand-edit `pnpm-lock.yaml` or `public/data/*.json` (§1);
- commit, push or run `git` history changes unless the user asks;
- put API keys, tokens or passwords in code, `.env.example` or chat — real values go
  in `.env`, which is git-ignored, and the user fills it;
- scrape LinkedIn or any site behind a login (§16).

---

## Done means

- `pnpm gate` exits 0, and you have quoted the result;
- new strings exist in both locales;
- new logic in `lib/` has a test next to it;
- UI checked in the browser at both widths;
- `ARCHITECTURE.md` updated if a measured number or a known gap changed (with the date).
