import { useVacanciesQuery } from "../api/queries/useVacanciesQuery"

/** The newest approved vacancies posted on InternWay (first page of the public search). */
export function useLatestVacancies(limit: number) {
  const query = useVacanciesQuery({})
  return { items: query.data?.items.slice(0, limit) ?? [], total: query.data?.total ?? 0 }
}
