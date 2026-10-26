import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { ApplicationStatus } from "@/types"

/** Moves a candidate through the pipeline with a note the student sees. */
export function useUpdateApplicationMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, status, note }: { id: number; status: ApplicationStatus; note: string }) =>
      apiClient.patch(API_ENDPOINTS.application(id), { status, note }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.applications.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myVacancies.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
