import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { MyApplication } from "../../types"

export function useMyApplicationsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.applications.list(),
    queryFn: async () => (await apiClient.get<MyApplication[]>(API_ENDPOINTS.myApplications)).data,
  })
}
