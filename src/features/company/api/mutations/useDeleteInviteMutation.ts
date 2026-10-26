import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS, QUERY_KEYS } from "@/constants"

export function useDeleteInviteMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiClient.delete(API_ENDPOINTS.companyInvite(id)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.company.all }),
  })
}
