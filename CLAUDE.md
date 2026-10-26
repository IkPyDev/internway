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

## Where things stand (2026-10-26)

Read this first in a new session. Update it when you finish a piece of work.

### Location

| What | Where |
| --- | --- |
| local checkout | `/Users/ikpydev/StudioProjects/internway` — open new sessions **here**, so this file loads |
| repo | `github.com/IkPyDev/internway` (public), branch `main` |
| live site | https://internway.vercel.app — Vercel redeploys every push to `main` (verified 2026-10-26) |
| CI | `gate.yml` runs `pnpm gate` on every push (last green: `fa2abf4`) |
| data refresh | `collect.yml` commits `chore(data): refresh internships` to `main` daily, so `git pull --ff-only` before you start and fetch + rebase before you push, or the push is rejected |

Data on 2026-10-26: 5,150 internships, 174 companies.

### What has shipped

| Commit | What |
| --- | --- |
| `e35d3b1` | Redesign from the content team's feedback: new hero copy and buttons, photo country cards, field grid, popular searches, outside search links (`SEARCH_SITES`), About page, English locale, navy/gold palette, serif headings |
| `61d329e` | 15 fields (the owner's list, labels word for word in uz/en; ru is our translation) |
| `0e950f5` | Sharper team photo |
| `ac73638` | Photo backgrounds in page heroes and the CTA band; the owner's USTravel "Our experience" text; **English is the default language** on a first visit |
| `17b8d2a` | Real USTravel student photos replace stock photos; "Our students abroad" gallery on home |
| `eeb588f` | Hotel team photo in the home hero |
| `fa2abf4` | A photo behind every page hero (and login, 404); images kept at original quality; lighter scrim |

### Photos — `public/img/`

All are real photos of students USTravel sent abroad, as the owner sent them.
**Do not re-compress them** (the owner rejected blurry results) and do not stretch a
portrait or <1280px photo across a full-width hero — it upscales and blurs.

| File | Used in |
| --- | --- |
| `team-hotel.jpg` (960×1280) | home hero — right-hand panel on `lg`, faded in with a mask |
| `team-sea.jpg` | home "How we help", About hero, Login background |
| `visas.jpg` (collage) | About page body |
| `hotel-team-selfie.jpg` | home CTA band, Employers hero |
| `milan.jpg` | Internships hero, 404, gallery |
| `cologne-night.jpg` | Students hero, gallery |
| `cologne.jpg` | Germany destination card |
| `paris-evening.jpg` | Europe destination card, Companies hero, gallery |
| `istanbul.jpg` | Universities hero, gallery |
| `cologne-rhine.jpg` | Portfolio hero, gallery |
| `louvre.jpg` | gallery |

The gallery list is `ABROAD_PHOTOS` in `src/features/home/constants.ts`. `PageHero` and
`CtaBand` take `image` + `position` (CSS `object-position`).

### Open — not done

- **Five destination cards still use Unsplash hot-links** (UK, Canada, Asia, USA,
  Remote) — swap in real photos when the owner sends them (`REGIONS[].photo`).
- **Duration, paid/unpaid and language-level filters** — the data has no such
  fields; they need the backend.
- **No backend**: accounts, applications, admin, payments.
- Technical gaps from `ARCHITECTURE.md` § Known gaps: one 670 kB bundle, no
  per-page `document.title`, no error boundary.
- **Owner to confirm**: the students in the photos agreed to be shown; the ru
  translations of the owner's uz/en copy (ours, not checked by a native speaker).

### How the owner works

- Writes short messages in Uzbek, often with screenshots or photos; reply in Uzbek.
- Sends photos in chat — copy the originals into `public/img/` as they are.
- "Commit qil va GitHub'ga push qil" means: commit to `main`, push, then wait for the
  `gate` run on GitHub and report it. Until then, never commit. So far every change
  went straight to `main` at the owner's request, not through a branch (§B1).
- Before reporting UI work, look at it in the browser at 1440px and 375px.

---

## Context map — read before you touch

| You are changing… | Read first |
| --- | --- |
| anything structural | `ARCHITECTURE.md`, `architecture.json` |
| a list page or its filters | `src/features/internships/` end to end (types → lib → api → hooks → components → page) |
| a new page | `src/routes/router.tsx`, `src/constants/routes.ts`, one page in `src/features/content/pages/` |
| copy / translations | all three `src/config/i18n/locales/{uz,en,ru}.json` |
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
pnpm i18n                 # uz/en/ru key parity only
pnpm test                 # vitest
pnpm collect              # refresh public/data/internships.json (Python 3, network)
pnpm import:companies     # rebuild public/data/companies.json from data/*.xlsx (needs openpyxl)
pnpm dlx shadcn@3.5.0 add <component>   # new UI primitive (§11)
```

`pnpm` comes from `corepack enable` (done 2026-10-20); on this machine it is on the nvm Node 24 `PATH`. Python tooling lives in `.venv`
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
- new strings exist in all three locales;
- new logic in `lib/` has a test next to it;
- UI checked in the browser at both widths;
- `ARCHITECTURE.md` updated if a measured number or a known gap changed (with the date).
