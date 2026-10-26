import { useNavigate, useSearch } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { useVacanciesQuery } from "../api/queries/useVacanciesQuery"
import { parseVacanciesSearch } from "../lib/vacancies"
import type { VacanciesSearch } from "../types"

/** Public vacancies with the filters and page kept in the URL. */
export function useVacanciesList() {
  const search = parseVacanciesSearch(useSearch({ strict: false }))
  const navigate = useNavigate()
  const query = useVacanciesQuery(search)
  return {
    search,
    update: (patch: Partial<VacanciesSearch>) =>
      navigate({ to: ROUTES.vacancies, search: { ...search, page: undefined, ...patch }, replace: true }),
    reset: () => navigate({ to: ROUTES.vacancies, search: {}, replace: true }),
    data: query.data,
    status: query.status,
    error: query.error,
    refetch: query.refetch,
  }
}
