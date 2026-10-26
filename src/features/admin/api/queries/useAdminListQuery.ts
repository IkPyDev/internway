import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { AdminRows } from "../../types"

export function useAdminListQuery<T extends keyof AdminRows>(list: T) {
  return useQuery({
    queryKey: QUERY_KEYS.admin.list({ list }),
    queryFn: async () => (await apiClient.get<AdminRows[T]>(API_ENDPOINTS.adminList(list))).data,
  })
}
