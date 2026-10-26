import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { VacanciesSearch, VacancyPage } from "../../types"

export function useVacanciesQuery(search: VacanciesSearch) {
  return useQuery({
    queryKey: QUERY_KEYS.vacancies.list(search),
    queryFn: async () => (await apiClient.get<VacancyPage>(API_ENDPOINTS.vacancies, { params: search })).data,
    placeholderData: keepPreviousData,
  })
}
