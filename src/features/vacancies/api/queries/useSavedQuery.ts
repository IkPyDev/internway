import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { SavedVacancy } from "../../types"

export function useSavedQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.saved.list(),
    queryFn: async () => (await apiClient.get<SavedVacancy[]>(API_ENDPOINTS.mySaved)).data,
  })
}
