import { Link, useLocation } from "@tanstack/react-router"
import { LockKeyhole } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import type { Role } from "@/types"
import { useSession } from "../hooks/useSession"
import { AccountNav } from "./AccountNav"

/** Renders children only for a signed-in user with one of the given roles. */
export function RequireRole({ roles, children }: { roles: Role[]; children: ReactNode }) {
  const { t } = useTranslation()
  const { user, status } = useSession()
  const { href } = useLocation()

  if (status === "pending") {
    return (
      <div className="container-page py-16">
        <CardGridSkeleton count={3} />
      </div>
    )
  }
  if (user?.role && roles.includes(user.role)) {
    return (
      <>
        <AccountNav role={user.role} />
        {children}
      </>
    )
  }
  return (
    <div className="container-page grid min-h-[50vh] place-items-center py-16 text-center">
      <div className="grid max-w-md gap-4">
        <LockKeyhole className="mx-auto size-10 text-navy-700" aria-hidden />
        <p className="text-lg">{t(user ? "auth.forbidden" : "auth.signInRequired")}</p>
        {!user && (
          <Button asChild className="mx-auto rounded-full font-bold">
            <Link to={ROUTES.login} search={{ redirect: href }}>
              {t("nav.login")}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
