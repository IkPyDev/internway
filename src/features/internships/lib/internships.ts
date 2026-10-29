import { readEnum, readPage, readString, toWords } from "@/lib"
import { FIELDS, FRESH_OPTIONS, KIND_OPTIONS, REGIONS, SEARCH_SITES } from "../constants"
import type {
  FieldKey,
  Internship,
  InternshipDto,
  InternshipStats,
  InternshipsSearch,
  RegionKey,
  SourceLink,
} from "../types"

const DAY = 86_400_000

const FIELD_PATTERNS = FIELDS.map((f) => ({ key: f.key, re: new RegExp(`\\b(?:${f.words.join("|")})`, "i") }))

/** Detects region tags from a free-text location. */
export function regionsOf(location: string): RegionKey[] {
  const loc = ` ${location.toLowerCase()}`
  const tags = new Set(REGIONS.filter((r) => r.words.some((w) => loc.includes(w))).map((r) => r.key))
  if (tags.has("germany") || tags.has("uk")) tags.add("europe")
  if (tags.has("japan") || tags.has("malaysia") || tags.has("china")) tags.add("asia")
  if (!tags.has("canada") && /, [A-Z]{2}\b/.test(location)) tags.add("usa")
  return [...tags]
}

/** Detects career fields from a job title. */
export function fieldsOf(title: string): FieldKey[] {
  return FIELD_PATTERNS.filter((f) => f.re.test(title)).map((f) => f.key)
}

export function normalizeInternships(rows: InternshipDto[]): Internship[] {
  return rows.map((r) => ({
    ...r,
    regions: regionsOf(r.location ?? ""),
    fields: fieldsOf(r.title),
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
    field: readEnum(
      raw.field,
      FIELDS.map((f) => f.key),
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
      (s.field === undefined || r.fields.includes(s.field)) &&
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

export function countFields(list: Internship[]): Record<FieldKey, number> {
  const out = Object.fromEntries(FIELDS.map((f) => [f.key, 0])) as Record<FieldKey, number>
  for (const r of list) for (const f of r.fields) out[f] += 1
  return out
}

/** Builds links that repeat the current search on outside job sites. */
export function sourceLinks(s: InternshipsSearch): SourceLink[] {
  const field = FIELDS.find((f) => f.key === s.field)?.en
  const words = [field, s.q].filter(Boolean).join(" ")
  const kw = /\bintern/i.test(words) ? words : `${words} internship`.trim()
  const loc = REGIONS.find((r) => r.key === s.region)?.en ?? ""
  return SEARCH_SITES.map((site) => ({
    name: site.name,
    url: site.url.replace("{kw}", encodeURIComponent(kw)).replace("{loc}", encodeURIComponent(loc)),
  }))
}
