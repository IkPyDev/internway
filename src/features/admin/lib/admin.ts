import { readEnum } from "@/lib"
import { ADMIN_TABS, MODERATION_FILTERS } from "../constants"
import type { AdminSearch } from "../types"

/** The overview tab is the default; the status filter defaults to "all". */
export function parseAdminSearch(search: Record<string, unknown>): AdminSearch {
  return { tab: readEnum(search.tab, ADMIN_TABS), status: readEnum(search.status, MODERATION_FILTERS) }
}

/** Keeps rows with the given moderation status; no status keeps all. */
export function byStatus<T extends { status: string }>(rows: T[], status: string | undefined): T[] {
  return status ? rows.filter((r) => r.status === status) : rows
}
