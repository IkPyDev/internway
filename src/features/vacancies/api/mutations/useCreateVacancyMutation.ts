import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { Vacancy, VacancyFields } from "@/types"

export function useCreateVacancyMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fields: VacancyFields) =>
      (await apiClient.post<Vacancy>(API_ENDPOINTS.vacancies, fields)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myVacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
