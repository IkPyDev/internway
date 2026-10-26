import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { Resume, ResumeFields } from "@/types"

/** Saves the resume; the server sends it back to moderation. */
export function useUpdateResumeMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (fields: ResumeFields) =>
      (await apiClient.put<Resume>(API_ENDPOINTS.resume, fields)).data,
    onSuccess: (resume) => {
      queryClient.setQueryData(QUERY_KEYS.resume.all, resume)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all })
    },
  })
}
