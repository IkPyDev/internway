import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

/** Signs out and forgets every cached account query. */
export function useDeleteSessionMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => apiClient.post(API_ENDPOINTS.logout),
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.me.all, null)
      for (const key of [
        QUERY_KEYS.resume.all,
        QUERY_KEYS.myVacancies.all,
        QUERY_KEYS.saved.all,
        QUERY_KEYS.company.all,
        QUERY_KEYS.applications.all,
        QUERY_KEYS.admin.all,
        QUERY_KEYS.vacancies.all,
      ]) {
        queryClient.removeQueries({ queryKey: key })
      }
    },
  })
}
