import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { Company } from "../../types"

export function useCompaniesQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.companies.list(),
    queryFn: async () => (await apiClient.get<Company[]>(API_ENDPOINTS.companies)).data,
  })
}
