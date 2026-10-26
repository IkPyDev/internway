import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { AdminStats } from "../../types"

export function useAdminStatsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.admin.detail("stats"),
    queryFn: async () => (await apiClient.get<AdminStats>(API_ENDPOINTS.adminStats)).data,
  })
}
