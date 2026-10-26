import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { VacancyDetail } from "../../types"

export function useVacancyQuery(id: number | undefined) {
  return useQuery({
    queryKey: QUERY_KEYS.vacancies.detail(id ?? 0),
    queryFn: async () => (await apiClient.get<VacancyDetail>(API_ENDPOINTS.vacancy(id ?? 0))).data,
    enabled: id !== undefined,
  })
}
