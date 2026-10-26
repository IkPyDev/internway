import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { User } from "@/types"

/** The signed-in user, or null for a visitor. */
export function useMeQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.me.all,
    queryFn: async () => (await apiClient.get<User | null>(API_ENDPOINTS.me)).data,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  })
}
