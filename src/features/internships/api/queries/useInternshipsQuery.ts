import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import { normalizeInternships } from "../../lib/internships"
import type { InternshipDto } from "../../types"

export function useInternshipsQuery() {
  return useQuery({
    queryKey: QUERY_KEYS.internships.list(),
    queryFn: async () =>
      normalizeInternships((await apiClient.get<InternshipDto[]>(API_ENDPOINTS.internships)).data),
  })
}
