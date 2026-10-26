import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

/** Blocks or unblocks a user; a blocked user is signed out everywhere. */
export function useUpdateUserMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, blocked }: { id: number; blocked: boolean }) =>
      apiClient.patch(API_ENDPOINTS.adminUser(id), { blocked }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.admin.all }),
  })
}
