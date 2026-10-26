import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

export function useCreateInviteMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (email: string) => apiClient.post(API_ENDPOINTS.companyInvites, { email }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.company.all }),
  })
}
