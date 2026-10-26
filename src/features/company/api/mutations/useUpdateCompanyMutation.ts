import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { CompanyFields } from "@/types"

/** Saves the profile; the header and lists show the company name, so they refresh too. */
export function useUpdateCompanyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (fields: CompanyFields) => apiClient.put(API_ENDPOINTS.company, fields),
    onSuccess: () => {
      for (const key of [
        QUERY_KEYS.company.all,
        QUERY_KEYS.me.all,
        QUERY_KEYS.vacancies.all,
        QUERY_KEYS.admin.all,
      ]) {
        queryClient.invalidateQueries({ queryKey: key })
      }
    },
  })
}
