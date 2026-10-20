import { useCompaniesQuery } from "../api/queries/useCompaniesQuery"

/** Companies with priority A — current, verified internship programmes. */
export function useTopCompanies(limit: number) {
  const query = useCompaniesQuery()
  const items = (query.data ?? []).filter((c) => c.priority === "A").slice(0, limit)
  return {
    items,
    total: query.data?.length ?? null,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
  }
}
