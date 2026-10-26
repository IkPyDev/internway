import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { AdminUserDetail } from "../../types"

export function useAdminUserQuery(id: number) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.detail(`user-${id}`),
    queryFn: async () => (await apiClient.get<AdminUserDetail>(API_ENDPOINTS.adminUser(id))).data,
  })
}
