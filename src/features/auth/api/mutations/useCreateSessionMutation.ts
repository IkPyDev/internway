import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { User } from "@/types"

/** Signs in with the emailed code. */
export function useCreateSessionMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: { email: string; code: string }) =>
      (await apiClient.post<User>(API_ENDPOINTS.verify, input)).data,
    onSuccess: (user) => queryClient.setQueryData(QUERY_KEYS.me.all, user),
  })
}
