import { useRouter } from "@tanstack/react-router"
import { useDeleteSessionMutation } from "../api/mutations/useDeleteSessionMutation"
import { useMeQuery } from "../api/queries/useMeQuery"
import { roleHome } from "../lib/auth"

/** The signed-in user, where their account lives, and sign-out. */
export function useSession() {
  const me = useMeQuery()
  const logout = useDeleteSessionMutation()
  const router = useRouter()
  const user = me.data ?? null
  return {
    user,
    status: me.status,
    home: roleHome(user),
    logout: () => logout.mutate(undefined, { onSuccess: () => router.history.push("/") }),
  }
}
