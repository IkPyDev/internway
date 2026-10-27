import { ROUTES } from "@/constants"
import { readString } from "@/lib"
import type { User } from "@/types"
import type { LoginSearch } from "../types"

/** Only same-site paths are allowed as a redirect target. */
export function parseLoginSearch(search: Record<string, unknown>): LoginSearch {
  const redirect = readString(search.redirect)
  return { redirect: redirect?.startsWith("/") && !redirect.startsWith("//") ? redirect : undefined }
}

/** Where each role lands after signing in; an employer finishes the company form first. */
export function roleHome(user: Pick<User, "role" | "company"> | null) {
  const role = user?.role ?? null
  if (role === "student") return ROUTES.resume
  if (role === "employer") return user?.company?.complete === false ? ROUTES.company : ROUTES.myVacancies
  if (role === "admin") return ROUTES.admin
  return ROUTES.login
}
