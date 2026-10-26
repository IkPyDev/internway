import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

export function useCreateApplicationMutation(vacancyId: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (coverLetter: string) => apiClient.post(API_ENDPOINTS.apply(vacancyId), { coverLetter }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vacancies.detail(vacancyId) })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.applications.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
