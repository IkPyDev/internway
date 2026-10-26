import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS } from "@/constants"

/** Asks the server to send a sign-in code to the email. */
export function useCreateOtpMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      await apiClient.post(API_ENDPOINTS.otp, { email })
    },
  })
}
