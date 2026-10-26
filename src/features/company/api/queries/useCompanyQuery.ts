import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { CompanyProfile } from "../../types"

export function useCompanyQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.company.all,
    queryFn: async () => (await apiClient.get<CompanyProfile>(API_ENDPOINTS.company)).data,
  })
}
