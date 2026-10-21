# ARCHITECTURE.md — InternWay

> **What this app is made of, and the one rule that keeps it that way.**
>
> `AGENTS.md` holds the hard rules and links here; this file explains the shape and
> the reasoning. Where a rule can be machine-checked it is, by
> `scripts/check-boundaries.mjs` — see § The dependency rule.
>
> **Every number in this file is a measurement with a date, not a live figure.**
> Re-measure before acting on one. The commands are given so you can.

---

## Layers

Imports point **downward only**. A layer may import from its own layer or any layer
below it, never from one above.

```
  test             src/test — setup, may import anything
      ↓
  entry            src/main.tsx, src/App.tsx — providers
      ↓
  routes/          the code-based route table                (src/routes)
      ↓
  features/        vertical business slices                  (src/features/*)
      ↓
  shared           components/, hooks/                       (cross-feature UI)
      ↓
  config/          apiClient, queryClient, i18n, appConfig   (src/config)
      ↓
  primitives       constants/, types/, store/, lib/
```

`src/lib` is a **primitive**: pure helpers (`cn`, `createEntityKeys`, `paginate`,
`safeUrl`, `relativeDate`, search-param readers) with no React and no imports from
any layer above. `constants/` builds `QUERY_KEYS` on it.

The layers are declared in **`architecture.json`**, which is not decorative:
`scripts/check-boundaries.mjs` reads it on every `pnpm gate`. Editing that file
changes what the build allows.

### The slices (2026-10-20)

| Feature | Owns | Imports from |
| --- | --- | --- |
| `internships` | the internships list, filters, region and field detection, stats, outside search links | — |
| `companies` | the employers list, priority badges, country filter | — |
| `contact` | the contact form (mailto until a backend exists) | — |
| `content` | static pages: students, employers, universities, portfolio, about, login, 404 | `contact` |
| `home` | the landing page | `internships`, `companies` |

Three feature → feature edges, no cycles. `home` and `content` are composition slices:
they own pages that assemble other slices' public components.

---

## The dependency rule

**A feature's `index.ts` is its only public surface.**

```ts
// ✅ another feature may do this
import { LatestInternships } from "@/features/internships"

// ❌ and never this
import { LatestInternships } from "@/features/internships/components/LatestInternships"
```

A deep import couples one slice to another's **file layout**: moving a file inside
your own feature then breaks someone else's. It also makes the barrel decorative, and
once a barrel is decorative nobody knows what the slice's contract is.

**Feature dependencies may not form a cycle.** A cycle means two slices are really one,
or that a shared piece belongs lower down — in `components/shared` or `lib`.

**A layer may import only from layers below it.** Type-only imports are exempt:
`import type` erases at compile time, so it creates no runtime edge and no load-order
cycle.

### Where this stands today

Measured 2026-10-20, after the field/destination update (`pnpm boundaries` re-measures):

| Metric | Value |
| --- | --- |
| source files scanned (incl. `components/ui`) | **101** |
| deep cross-feature imports (R1) | **0** |
| feature cycles (R2) | **0** |
| upward layer imports (R3) | **0** |
| feature → feature edges | **3** |

### How it is enforced

`pnpm boundaries` is part of `pnpm gate`. Because the tree started clean, it is a
**flat ban**: any violation fails, on any branch. There is no baseline file to go
stale. The checker was verified to fail on a planted deep import before it was
trusted.

If the project ever accumulates debt it cannot fix at once, switch the gate to
compare against the fork point from `main` and fail only on violations a branch
**adds** — not before.

---

## Data flow

```
  scripts/collect.py ─┐
  scripts/import_companies.py ─┴→ public/data/*.json

  route → page → feature hook → api hook → apiClient → public/data/*.json
                      ↓                                (later: the backend)
                TanStack Query cache
```

- **Pages compose.** No query, no `useMemo` over data, no business branching.
- **Feature hooks hold logic.** `useInternshipsList` reads the URL, the query, and
  returns the filtered page plus region counts.
- **`lib/` holds the pure parts** — filter, parse, normalize — so they are unit-tested
  without React.
- **Api hooks hold HTTP.** One per file. `queryFn` normalizes the DTO once
  (`normalizeInternships` adds `regions` and a lowercase `search` field), so every
  consumer of the cache gets the same shape.
- **`apiClient` is the only way out.** It sets the base URL (`VITE_API_URL` or the
  app's own origin) and the `Accept-Language` header.

Filtering is client-side because the whole dataset is one JSON file (≈1.5 MB, 5,184
rows on 2026-10-20). When a backend exists, filters move to query params on the
request: the URL search params already have the right shape, so `useInternshipsList`
passes them into `QUERY_KEYS.internships.list(search)` and the `lib` filter is deleted.

Server state belongs to TanStack Query. URL state (filters, page) belongs to the
router. Client state (mobile nav open) belongs to Zustand. Duplicating one into
another is how values go stale.

---

## Cross-cutting

| Concern | Where | Note |
| --- | --- | --- |
| HTTP | `src/config/axios.ts` | `apiClient`; base URL, `Accept-Language` |
| Query defaults | `src/config/queryClient.ts` | `staleTime` 5 m, `gcTime` 30 m, `retry` 1 |
| Query keys | `src/constants/query-keys.ts` | the registry; `createEntityKeys` builds it |
| Endpoints | `src/constants/api-endpoints.ts` | never a URL literal |
| Routes | `src/constants/routes.ts` + `src/routes/router.tsx` | paths, nav items, the route table |
| i18n | `src/config/i18n/` | en default, uz, ru; no fallback; choice kept in `localStorage` |
| Runtime settings | `src/config/app.ts` ← `.env` | `VITE_CONTACT_EMAIL`, `VITE_API_URL` |
| Styling | Tailwind 4 CSS-first, `@theme inline` in `src/styles.css` | **no `tailwind.config.ts` exists** |
| Brand tokens | `src/styles.css` `:root` | navy / green / gold from the logo |
| UI primitives | `src/components/ui/*` | shadcn — generated, do not fork |
| App-specific UI | `src/components/shared/*` | layout, sections, states, pager |
| External links | `safeUrl()` in `src/lib` | scraped data is untrusted |
| Hosting | Vercel, `vercel.json` | SPA fallback to `index.html`; `/data` not cached, `/assets` immutable |
| CI | `.github/workflows/` | `gate.yml` on push/PR; `collect.yml` daily data refresh |

---

## Known gaps — deliberately recorded, not hidden

True as of 2026-10-20:

- **No backend.** Accounts, applications and their status, the admin panel,
  company/listing approval and payments from the product brief cannot work yet. The
  login page says so. The contact form opens a `mailto:` and is disabled until
  `VITE_CONTACT_EMAIL` is set.
- **One 650 kB JS bundle** (212 kB gzip). Routes are not code-split yet; Vite warns.
  Fix: `lazyRouteComponent` per page.
- **`document.title` never changes** per page; every tab says "InternWay". Matters for
  SEO once the site is public.
- **No error boundary.** A render throw blanks the app. Add `errorComponent` on the
  root route.
- **Filtering runs on the main thread** over 5k rows on every keystroke (debounced
  250 ms on internships). Fine at this size; move server-side with the backend.
- **Field tags are keyword guesses.** `fieldsOf` (regex over the title, `FIELDS` in
  `internships/constants.ts`) tags ≈86% of rows; generic titles ("Intern - Multiple
  Teams") get none and appear only under "all fields".
- **LinkedIn, Indeed, EURES, ErasmusIntern, EuroBrussels and iAgora are links, not
  sources.** The content team suggested them; none offers a public feed we may poll
  (login walls, Cloudflare challenge, robots.txt blocks AI agents, no RSS). `SEARCH_SITES`
  turns the current filters into a search on each site instead — see AGENTS.md §16.
- **Destination photos are hot-linked from Unsplash** (free licence):
  `REGIONS[].photo`. Team, office and student photos are local in `public/img/`. If Unsplash is down they fail
  to load; copy them into `public/img/` once the content team picks final photos.
- **Duration, paid/unpaid and language-level filters do not exist** — the sources
  only give title, company, location, date and link. They need a backend where
  listings are entered or enriched.
- **Prices are placeholders** ("Narx tez orada") — the payment brief gives none.
- **Data refresh runs in GitHub Actions** (`collect.yml`, daily) once the repo is on
  GitHub. Not yet verified that every source answers from GitHub's datacenter IPs —
  check the run log. Each refresh commits the full ≈1.5 MB JSON, so git history grows
  roughly 0.5 GB a year; move the data to storage or the backend before that matters.
- **Tests:** 4 files, 14 tests — `lib` helpers, both slices' `lib/`, one component
  test. No page or routing tests.

---

## Rule authority

One fact, one home — see `AGENTS.md` § Rule authority. This file explains; it never
introduces a rule.
