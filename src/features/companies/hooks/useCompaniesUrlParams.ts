import { useNavigate, useSearch } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { parseCompaniesSearch } from "../lib/companies"
import type { CompaniesSearch } from "../types"

export function useCompaniesUrlParams() {
  const search = parseCompaniesSearch(useSearch({ strict: false }))
  const navigate = useNavigate()
  const update = (patch: Partial<CompaniesSearch>) =>
    navigate({ to: ROUTES.companies, search: { ...search, ...patch }, replace: true })
  return { search, update }
}
