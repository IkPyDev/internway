import { readEnum, readPage, readString, toWords } from "@/lib"
import { FRESH_OPTIONS, KIND_OPTIONS, REGIONS } from "../constants"
import type { Internship, InternshipDto, InternshipStats, InternshipsSearch, RegionKey } from "../types"

const DAY = 86_400_000

/** Detects region tags from a free-text location. */
export function regionsOf(location: string): RegionKey[] {
  const loc = ` ${location.toLowerCase()}`
  const tags = new Set(REGIONS.filter((r) => r.words.some((w) => loc.includes(w))).map((r) => r.key))
  if (tags.has("germany") || tags.has("uk")) tags.add("europe")
  if (!tags.has("canada") && /, [A-Z]{2}\b/.test(location)) tags.add("usa")
  return [...tags]
}

export function normalizeInternships(rows: InternshipDto[]): Internship[] {
  return rows.map((r) => ({
    ...r,
    regions: regionsOf(r.location ?? ""),
    search: `${r.title} ${r.company} ${r.location}`.toLowerCase(),
  }))
}

export function parseInternshipsSearch(
  raw: Partial<Record<keyof InternshipsSearch, unknown>>,
): InternshipsSearch {
  return {
    q: readString(raw.q),
    kind: readEnum(
      raw.kind,
      KIND_OPTIONS.map((o) => o.value),
    ),
    region: readEnum(
      raw.region,
      REGIONS.map((r) => r.key),
    ),
    fresh: readEnum(
      raw.fresh,
      FRESH_OPTIONS.map((o) => o.value),
    ),
    page: readPage(raw.page),
  }
}

/** Applies every filter except region, so region counts can be shown next to each pill. */
export function filterInternships(list: Internship[], s: InternshipsSearch, now = Date.now()): Internship[] {
  const words = toWords(s.q)
  const since = s.fresh ? now - Number(s.fresh) * DAY : undefined
  return list.filter(
    (r) =>
      (s.kind === undefined || r.kind === s.kind) &&
      (since === undefined || (r.date !== null && Date.parse(r.date) >= since)) &&
      words.every((w) => r.search.includes(w)),
  )
}

export function byRegion(list: Internship[], region: RegionKey | undefined): Internship[] {
  return region === undefined ? list : list.filter((r) => r.regions.includes(region))
}

export function countRegions(list: Internship[]): Record<RegionKey, number> {
  const out = Object.fromEntries(REGIONS.map((r) => [r.key, 0])) as Record<RegionKey, number>
  for (const r of list) for (const t of r.regions) out[t] += 1
  return out
}

export function internshipStats(list: Internship[], now = Date.now()): InternshipStats {
  return {
    total: list.length,
    programs: list.filter((r) => r.kind === "program").length,
    today: list.filter((r) => r.date !== null && Date.parse(r.date) >= now - DAY).length,
    regions: new Set(list.flatMap((r) => r.regions)).size,
  }
}
