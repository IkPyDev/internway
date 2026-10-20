import { useMemo } from "react"
import { appConfig } from "@/config/app"
import { paginate } from "@/lib"
import { useInternshipsQuery } from "../api/queries/useInternshipsQuery"
import { byRegion, countRegions, filterInternships } from "../lib/internships"
import { useInternshipsUrlParams } from "./useInternshipsUrlParams"

/** Everything the internships page shows: filters, region counts and the current page. */
export function useInternshipsList() {
  const query = useInternshipsQuery()
  const { search, update } = useInternshipsUrlParams()

  const view = useMemo(() => {
    const base = filterInternships(query.data ?? [], search)
    return {
      base: base.length,
      counts: countRegions(base),
      page: paginate(byRegion(base, search.region), search.page ?? 1, appConfig.pageSize),
    }
  }, [query.data, search])

  return { ...view, search, update, status: query.status, error: query.error, refetch: query.refetch }
}
