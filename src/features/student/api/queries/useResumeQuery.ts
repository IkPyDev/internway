import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { Resume } from "@/types"

export function useResumeQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.resume.all,
    queryFn: async () => (await apiClient.get<Resume | null>(API_ENDPOINTS.resume)).data,
  })
}
