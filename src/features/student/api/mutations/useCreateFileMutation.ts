import { useMutation } from "@tanstack/react-query"
import { apiClient } from "@/config/axios"
import { API_ENDPOINTS } from "@/constants"
import type { UploadedFile } from "@/types"

/** Uploads one photo or PDF as the raw body; the server checks its real type. */
export function useCreateFileMutation() {
  return useMutation({
    mutationFn: async (file: File) =>
      (
        await apiClient.post<UploadedFile>(API_ENDPOINTS.files, file, {
          params: { name: file.name },
          headers: { "Content-Type": file.type || "application/octet-stream" },
        })
      ).data,
  })
}
