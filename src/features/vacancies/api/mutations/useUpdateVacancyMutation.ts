import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { Vacancy, VacancyFields } from "@/types"

/** Saves an edit; the server sends the vacancy back to moderation. */
export function useUpdateVacancyMutation(id: number) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fields: VacancyFields) =>
      (await apiClient.put<Vacancy>(API_ENDPOINTS.vacancy(id), fields)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myVacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
