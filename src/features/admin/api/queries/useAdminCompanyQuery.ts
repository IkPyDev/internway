import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { AdminCompanyDetail } from "../../types"

export function useAdminCompanyQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.detail(`company-${id}`),
    queryFn: async () => (await apiClient.get<AdminCompanyDetail>(API_ENDPOINTS.adminCompany(id))).data,
  })
}
