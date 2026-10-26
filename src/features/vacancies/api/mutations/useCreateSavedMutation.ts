import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

/** Adds a vacancy to the student's saved list. */
export function useCreateSavedMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (vacancyId: number) => apiClient.put(API_ENDPOINTS.save(vacancyId)),
    onSuccess: (_, vacancyId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.saved.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vacancies.detail(vacancyId) })
    },
  })
}
