import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { PublicCompany } from "../../types"

export function usePublicCompanyQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.company.detail(id),
    queryFn: async () => (await apiClient.get<PublicCompany>(API_ENDPOINTS.publicCompany(id))).data,
  })
}
