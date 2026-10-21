# AGENTS.md — InternWay

> **The rule core for this repo. Every rule lives in exactly one place: here.**
>
> This project is developed with Claude Code. Claude Code reads this file because
> `CLAUDE.md` imports it (`@AGENTS.md`). The name `AGENTS.md` is the cross-tool
> convention, so another agent would find the same rules without a new file.
>
> `CLAUDE.md` adds the Claude-only layer (role, context map, session workflow) and
> never restates a rule. `ARCHITECTURE.md` explains the shape and the reasoning and
> links here for rules. There is **no other rule source**. If you find one, it is
> stale by definition: delete it or make it a pointer to this file.

---

## What this repo is

**InternWay** is a web platform that gathers international internships, traineeships
and programmes for students and graduates from Uzbekistan, and connects them with
employers and universities. UI copy is English (default), Uzbek and Russian.

Today it is a **frontend only**: data comes from static JSON in `public/data/`,
produced by the Python scripts in `scripts/`. Accounts, applications, the admin
panel and payments need a backend that does not exist yet (see `ARCHITECTURE.md` §
Known gaps).

**pnpm only** (`pnpm@9.12.3` via `packageManager`, Node ≥20). Not a monorepo.

Stack: **React 19** · Vite 7 · TypeScript 5.9 (strict) · **TanStack Router**
(code-based) · TanStack Query v5 · **Zustand** · **Tailwind 4** (CSS-first) ·
**shadcn/ui + Radix** · **Biome 2.3** (not ESLint/Prettier) · react-i18next (uz/en/ru) ·
Vitest 4 + Testing Library · axios.

Layout — imports point **downward only**:

| Layer      | Folder | What lives there |
| ---------- | ------ | ---------------- |
| test       | `src/test` | test setup; may import anything |
| entry      | `src/main.tsx`, `src/App.tsx` | providers |
| routes     | `src/routes` | the code-based route table |
| features   | `src/features/*` | vertical slices — the default home for new code |
| shared     | `src/components`, `src/hooks` | cross-feature UI and logic |
| config     | `src/config` | axios `apiClient`, `queryClient`, i18n, `appConfig` |
| primitives | `src/constants`, `src/types`, `src/store`, `src/lib` | values, types, client state, pure helpers |

**`architecture.json` is the authority** for this table — the boundary gate reads it,
so the table follows the file, never the reverse.

One alias: `@` → `src`, declared in `vite.config.ts` **and** `tsconfig.json` — keep
both in step.

A feature slice is:

```
src/features/<feature>/
  api/queries/use<X>Query.ts     one hook per file — the only place HTTP happens
  api/mutations/use<Verb><X>Mutation.ts
  components/                    feature-internal markup
  hooks/                         feature logic: use<X>List, use<X>UrlParams, forms
  lib/                           pure functions (filter, parse, normalize) + their tests
  pages/                         route-level components — thin
  types/                         every exported type for the slice
  constants.ts                   option lists and lookup structures
  index.ts                       the slice's public surface
```

The house pattern is **route → page → feature hook → api hook → apiClient**. The
canonical slice is `src/features/internships/`. Copy its shape.

---

## Hard rules

### §1 — Generated files are never hand-edited

| File | Generator |
| --- | --- |
| `pnpm-lock.yaml` | `pnpm install` / `pnpm add` |
| `public/data/internships.json` | `pnpm collect` (`scripts/collect.py`) |
| `public/data/companies.json` | `pnpm import:companies` (`scripts/import_companies.py`) |
| `src/components/ui/*` | `pnpm dlx shadcn@3.5.0 add <name>` — see §11 |

Change the generator or its input, never the output. `.claude/settings.json` denies
edits to the first three.

### §2 — The chain

A **page** composes; it does not fetch. No `useQuery`, no `useMutation`, no
`queryClient`, no `useMemo` over data, no business branching inside a page or a
presentational component. Those live in a feature hook under `hooks/`, which calls an
api hook under `api/`. A page may branch on **load status** (pending / error /
empty / success) — that is layout, not business logic.

### §3 — One api hook per file, named by shape

`api/queries/use<Thing>Query.ts` · `use<Thing>InfiniteQuery.ts` ·
`api/mutations/use{Create,Update,Delete}<Thing>Mutation.ts`.
Every request goes through `apiClient` from `@/config/axios` — never `fetch` or a
bare `axios.create()`. URLs come from `API_ENDPOINTS` (`src/constants`), never a
string literal. When the backend arrives, only `API_ENDPOINTS` and the
`queryFn` bodies change.

### §4 — Query keys come from `QUERY_KEYS`

`src/constants/query-keys.ts` is the registry; `createEntityKeys` (`src/lib`) is the
factory. Never call `createEntityKeys` in a hook file — a second key for the same
data means TanStack fetches it twice.

```ts
import { QUERY_KEYS } from "@/constants"
queryKey: QUERY_KEYS.internships.list()
```

Invalidate by prefix (`QUERY_KEYS.internships.all`) and list every key a write
changes.

### §5 — Filters live in the URL

List filters are TanStack Router search params, parsed by the slice's
`parse<X>Search` (in `lib/`) and registered as that route's `validateSearch`. Search
types have **optional fields**: an absent key means "no filter", so URLs stay clean
and links to the route need no `search` prop. Page 1 is absent too. Never mirror URL
state into Zustand or `useState`.

### §6 — Types live in the slice's `types/`

Every exported `interface` / `type` for a feature belongs in
`src/features/<f>/types/`. A hook, component or `lib` file that exports a type is a
bug — move it. A local, unexported helper type inside one file is fine. Cross-feature
types go in `src/types/`. Exception: a `lib/` file in `src/lib` may export the
types of its own helpers (`Page<T>`, `RelativeDate`).

### §7 — Absent is `undefined`, not `0` or `""`

`0` is a valid number and `if (value)` throws it away with the empty case. Optional
search params, form fields and filter inputs are `undefined` when absent. Data from
JSON uses `null` where the source does (`date: string | null`). Use `0` only where
zero is the real answer — a count, a price.

### §8 — Constants files hold structures, not scalars

`REGIONS = [{ key, label, words }]` and `KIND_OPTIONS` belong in `constants.ts`. A
lone number or string is declared inline at its single use site. App-wide runtime
settings go in `appConfig` (`src/config/app.ts`), read from `.env`.

### §9 — A feature's `index.ts` is its only public surface — ENFORCED

Crossing into another feature goes **through the barrel**:

```ts
// ✅ import { LatestInternships } from "@/features/internships"
// ❌ import { LatestInternships } from "@/features/internships/components/LatestInternships"
```

If the symbol is not exported from that feature's `index.ts`, **export it** — do not
reach past the barrel. Keep each barrel to what other slices and `routes/` actually
need. `pnpm boundaries` fails on a deep import. See §15.

### §10 — Every user-facing string goes through i18n, in **all three** locales

`src/config/i18n/locales/{uz,en,ru}.json`. `fallbackLng` is `false`, so a key missing
from one file renders as the raw dotted path. Add the key to every file, in the same
place. `pnpm i18n` (part of the gate) fails when the key sets differ. Option lists in
`constants.ts` store the **i18n key** (`label: "regions.germany"`), not the text.
Data from `public/data` (titles, company names) is shown as-is and is not translated.

### §11 — Never fork a shadcn component to restyle it

`src/components/ui/*` is generated by the shadcn CLI. Style at the call site with
`className` + `cn()` from `@/lib`, or add a `cva` variant to the component. Regenerate
with `pnpm dlx shadcn@3.5.0 add <name> --overwrite`; after a regeneration, check the
`cn` import still reads `@/lib/utils` (3.5.0 once wrote `from "cn"`). Biome does not
lint this folder.

### §12 — `as any` is a debt, not a tool

There are **0** today. Do not add one to silence the type-checker — model the data. A
narrowing cast of a value already validated (`v as InternshipKind` after a Select
whose items come from `KIND_OPTIONS`) is acceptable; say so in the report if you add
one.

### §13 — Scraped data is untrusted

Everything in `public/data/*.json` comes from third-party sites. Render it as text
only — never `dangerouslySetInnerHTML`, `srcDoc` or an iframe. Every external link
goes through `safeUrl()` from `@/lib` (only `http(s)` passes) and opens with
`target="_blank" rel="noopener noreferrer"`.

### §14 — English comments, English code

Every comment, log line and identifier is English, including the Python scripts.
User-facing copy is the only exception, and it goes through i18n (§10). A comment
says what the code does, in one line; it does not narrate history.

### §15 — Architecture boundaries are machine-enforced

`pnpm boundaries` (`scripts/check-boundaries.mjs`, part of `pnpm gate`) enforces three
rules declared in `architecture.json`:

| | Rule |
| --- | --- |
| **R1** | a feature may not deep-import another feature's internals (§9) |
| **R2** | feature dependencies may not form a cycle (value imports) |
| **R3** | a layer may import only from its own layer or below — `import type` is exempt |

The tree is clean (0 / 0 / 0, measured 2026-10-20), so the gate is a **flat ban**:
any violation fails. If you believe a rule is wrong, change `architecture.json`
deliberately and say so — that is a decision, not a workaround.

### §16 — Data scripts never scrape behind a login

`scripts/collect.py` reads only public APIs, public RSS feeds and public ATS boards
(Greenhouse, Lever, Ashby), with an honest `User-Agent`. No LinkedIn scraping, no
logged-in sessions, no bot-detection evasion, no copying of full articles — store
title, company, location, date and link only. A new source is added to `RSS` or
`BOARDS` in that file. A site that cannot be read this way (LinkedIn, Indeed…) is
offered as a link in `SEARCH_SITES` (`src/features/internships/constants.ts`), which the
visitor opens themselves.

---

## Branching

Git is initialised on `main` (2026-10-20) with no remote and no commits yet. Once a
remote exists (GitLab or GitHub):

- **§B1** — every branch is cut from `main`: `git checkout -b <type>/<description>`.
- **§B2** — `<type>` is a conventional-commit type: `feat` `fix` `docs` `style`
  `refactor` `perf` `test` `chore` `ci` `build` `revert` `hotfix`. Commit messages
  use the same vocabulary.
- **§B3** — a branch reaches `main` only after it passed `pnpm gate`.

Nothing enforces these locally yet; add hooks (lefthook) and protected branches when
there is a team.

---

## Rule authority — one fact, one home

| Source | Role |
| --- | --- |
| **`AGENTS.md`** (this file) | the hard rules — imported by `CLAUDE.md` |
| **`ARCHITECTURE.md`** | shape and reasoning; links to a rule, never restates it |
| **`architecture.json`** | the machine-readable manifest the boundary gate reads |
| **`CLAUDE.md`** | Claude Code workflow only |
| **`README.md`** | how to run it, for humans |

If you are about to write a sentence that already exists in one of these, link to it
instead.

---

## What proves a change

`pnpm gate` — Biome, TypeScript, boundaries, i18n parity, Vitest, build. Report real
exit codes and state what it did **not** cover. Nothing in the gate checks layout,
responsive behaviour or runtime requests: if you changed UI, open it in a browser at
phone width (375px) and desktop width (1440px) and say what you saw.
