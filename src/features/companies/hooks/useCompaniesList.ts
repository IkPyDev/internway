import { useMemo } from "react"
import { useCompaniesQuery } from "../api/queries/useCompaniesQuery"
import { byCountry, countCountries, filterCompanies } from "../lib/companies"
import { useCompaniesUrlParams } from "./useCompaniesUrlParams"

export function useCompaniesList() {
  const query = useCompaniesQuery()
  const { search, update } = useCompaniesUrlParams()

  const view = useMemo(() => {
    const base = filterCompanies(query.data ?? [], search)
    return { base: base.length, countries: countCountries(base), items: byCountry(base, search.country) }
  }, [query.data, search])

  return { ...view, search, update, status: query.status, error: query.error, refetch: query.refetch }
}
