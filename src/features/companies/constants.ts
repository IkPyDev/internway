import type { CompanyPriority, PriorityFilter } from "./types"

export const PRIORITY_OPTIONS: { value: PriorityFilter; label: string }[] = [
  { value: "A", label: "companies.filter.A" },
  { value: "B", label: "companies.filter.B" },
  { value: "verified", label: "companies.filter.verified" },
]

export const PRIORITY_BADGE: Record<CompanyPriority, { label: string; hint: string; className: string }> = {
  A: {
    label: "companies.priority.A",
    hint: "companies.priorityHint.A",
    className: "bg-green-100 text-green-600",
  },
  B: {
    label: "companies.priority.B",
    hint: "companies.priorityHint.B",
    className: "bg-[#fff4dc] text-[#a26b00]",
  },
  "": {
    label: "companies.priority.none",
    hint: "companies.priorityHint.none",
    className: "bg-muted text-muted-foreground",
  },
}

/** Country names as they appear in the WAYU spreadsheet, mapped to i18n keys. */
export const COUNTRY_LABELS: Record<string, string> = {
  Italy: "countries.italy",
  "South Korea": "countries.southKorea",
  Malaysia: "countries.malaysia",
  "United Kingdom": "countries.uk",
}
