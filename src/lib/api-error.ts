/** The error code the API server sends (`{ error: "resume_required" }`), or "server_error". */
export function apiErrorCode(error: unknown): string {
  const data = (error as { response?: { data?: { error?: unknown } } } | null)?.response?.data
  return typeof data?.error === "string" ? data.error : "server_error"
}
