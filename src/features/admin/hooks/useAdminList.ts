import { useMemo } from "react"
import { useAdminListQuery } from "../api/queries/useAdminListQuery"
import { byStatus } from "../lib/admin"
import type { AdminRows, ModeratedTable } from "../types"

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

/** Companies, resumes or vacancies, narrowed to a moderation status. */
export function useModerationQueue<T extends ModeratedTable>(table: T, status: string | undefined) {
  const list = useAdminList(table)
  const items = useMemo(() => byStatus<AdminRows[T][number]>(list.items, status), [list.items, status])
  return { ...list, items }
}
