import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { ModeratedTable } from "../../types"

interface ModerationInput {
  table: ModeratedTable
  id: number
  status: "approved" | "rejected"
  reason?: string
}

/** Approves or rejects a company, a resume or a vacancy. */
export function useUpdateModerationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ table, id, ...body }: ModerationInput) =>
      apiClient.post(API_ENDPOINTS.moderate(table, id), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.vacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.company.all })
    },
  })
}
