import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { StudentCardData } from "../../types"

/** Keyed by viewer, because a verified employer gets names the public does not. */
export function useStudentsQuery(viewerId: number | null) {
  return useQuery({
    queryKey: QUERY_KEYS.students.list({ viewerId }),
    queryFn: async () => (await apiClient.get<StudentCardData[]>(API_ENDPOINTS.students)).data,
  })
}
