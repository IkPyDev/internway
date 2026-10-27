import { useState } from "react"
import { useCreateFileMutation } from "../api/mutations/useCreateFileMutation"
import { uploadError } from "../lib/resume"

/** Uploads one file at a time for a form; feeds `FileUpload`. */
export function useFileUpload() {
  const mutation = useCreateFileMutation()
  const [fileError, setFileError] = useState<string>()
  return {
    /** Uploads a file and resolves to its id, or null after showing why it was refused. */
    upload: async (file: File, accept: string): Promise<string | null> => {
      const local = uploadError(file, accept)
      setFileError(local)
      mutation.reset()
      if (local) return null
      try {
        return (await mutation.mutateAsync(file)).id
      } catch {
        return null
      }
    },
    uploading: mutation.isPending,
    /** A local refusal code (size, type); the server's error is `uploadFailure`. */
    fileError,
    uploadFailure: mutation.error,
  }
}
