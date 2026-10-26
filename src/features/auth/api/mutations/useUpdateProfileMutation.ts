import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"
import type { User } from "@/types"
import type { ProfileInput } from "../../types"

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: ProfileInput) => (await apiClient.patch<User>(API_ENDPOINTS.me, input)).data,
    onSuccess: (user) => queryClient.setQueryData(QUERY_KEYS.me.all, user),
  })
}
