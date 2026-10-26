import { useMemo } from "react"
import { useAdminListQuery } from "../api/queries/useAdminListQuery"
import { byQuery, byStatus, filterUsers, roleCounts } from "../lib/admin"
import type { AdminRows, AdminSearch, ModeratedTable } from "../types"

/** One admin table. */
export function useAdminList<T extends keyof AdminRows>(list: T) {
  const query = useAdminListQuery(list)
  return {
    items: (query.data ?? []) as AdminRows[T],
    status: query.status,
    error: query.error,
    refetch: query.refetch,
  }
}

/** Companies, resumes or vacancies, narrowed to a moderation status and a text query over `keys`
 * (a module-level constant, so the memo holds). */
export function useModerationQueue<T extends ModeratedTable>(
  table: T,
  status: string | undefined,
  q: string | undefined,
  keys: (keyof AdminRows[T][number])[],
) {
  const list = useAdminList(table)
  const items = useMemo(
    () => byQuery(byStatus<AdminRows[T][number]>(list.items, status), q, keys),
    [list.items, status, q, keys],
  )
  return { ...list, items, total: list.items.length }
}

/** Users narrowed by the URL filters, plus per-role counts over all of them. */
export function useUsers(filters: Pick<AdminSearch, "role" | "blocked" | "q">) {
  const list = useAdminList("users")
  const { role, blocked, q } = filters
  const items = useMemo(() => filterUsers(list.items, { role, blocked, q }), [list.items, role, blocked, q])
  const counts = useMemo(() => roleCounts(list.items), [list.items])
  return { ...list, items, counts, total: list.items.length }
}

/** Applications narrowed by a text query. */
export function useApplications(q: string | undefined) {
  const list = useAdminList("applications")
  const items = useMemo(() => byQuery(list.items, q, ["name", "email", "title", "company"]), [list.items, q])
  return { ...list, items }
}
