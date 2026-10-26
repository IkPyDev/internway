import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { MyVacancy } from "../../types"

export function useMyVacanciesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.myVacancies.list(),
    queryFn: async () => (await apiClient.get<MyVacancy[]>(API_ENDPOINTS.myVacancies)).data,
  })
}
