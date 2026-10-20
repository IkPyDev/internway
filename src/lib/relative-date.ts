export type RelativeDate =
  | { key: "unknown" | "today" | "yesterday" }
  | { key: "daysAgo" | "monthsAgo" | "yearsAgo"; count: number }

const DAY = 86_400_000

/** Describes how long ago an ISO date was, as an i18n key plus count. */
export function relativeDate(iso: string | null, now = Date.now()): RelativeDate {
  if (!iso) return { key: "unknown" }
  const days = Math.floor((now - Date.parse(iso)) / DAY)
  if (days <= 0) return { key: "today" }
  if (days === 1) return { key: "yesterday" }
  if (days < 30) return { key: "daysAgo", count: days }
  if (days < 365) return { key: "monthsAgo", count: Math.floor(days / 30) }
  return { key: "yearsAgo", count: Math.floor(days / 365) }
}
