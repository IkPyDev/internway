import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

/** Closes a vacancy, or reopens it (back to moderation). */
export function useUpdateVacancyStatusMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, closed }: { id: number; closed: boolean }) =>
      apiClient.patch(API_ENDPOINTS.vacancy(id), { closed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myVacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
