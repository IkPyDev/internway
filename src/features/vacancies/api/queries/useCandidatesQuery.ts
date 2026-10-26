import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { CandidatesResponse } from "../../types"

export function useCandidatesQuery(vacancyId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.detail(vacancyId),
    queryFn: async () => (await apiClient.get<CandidatesResponse>(API_ENDPOINTS.candidates(vacancyId))).data,
  })
}
