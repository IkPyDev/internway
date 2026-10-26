import { ROUTES } from "@/constants"
import { readString } from "@/lib"
import type { Role } from "@/types"
import type { LoginSearch } from "../types"

/** Only same-site paths are allowed as a redirect target. */
export function parseLoginSearch(search: Record<string, unknown>): LoginSearch {
  const redirect = readString(search.redirect)
  return { redirect: redirect?.startsWith("/") && !redirect.startsWith("//") ? redirect : undefined }
}

/** Where each role lands after signing in. */
export function roleHome(role: Role | null) {
  if (role === "student") return ROUTES.resume
  if (role === "employer") return ROUTES.myVacancies
  if (role === "admin") return ROUTES.admin
  return ROUTES.login
}
