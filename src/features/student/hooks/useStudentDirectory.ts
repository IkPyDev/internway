import { useSession } from "@/features/auth"
import { useStudentsQuery } from "../api/queries/useStudentsQuery"

/** Approved student profiles; names and contacts only for verified employers. */
export function useStudentDirectory() {
  const { user, status: session } = useSession()
  const query = useStudentsQuery(user?.id ?? null)
  return {
    items: query.data ?? [],
    status: session === "pending" ? "pending" : query.status,
    error: query.error,
    refetch: query.refetch,
  }
}
