import { Link } from "@tanstack/react-router"
import { LogOut, UserRound } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"
import { useSession } from "../hooks/useSession"

/** Header slot: "Sign in" and "Get started" for visitors, the account link and sign-out for users. */
export function AccountButton() {
  const { t } = useTranslation()
  const { user, home, logout } = useSession()

  if (!user) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        <Button asChild variant="outline" className="rounded-full font-bold">
          <Link to={ROUTES.login}>{t("nav.login")}</Link>
        </Button>
        <Button asChild className="rounded-full font-bold">
          <Link to={ROUTES.students}>{t("nav.start")}</Link>
        </Button>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-1">
      <Button asChild variant="outline" className="max-w-40 rounded-full font-bold">
        <Link to={home} title={user.email}>
          <UserRound aria-hidden />
          <span className="truncate">{user.name || t("auth.account")}</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={logout}
        aria-label={t("auth.logout")}
        title={t("auth.logout")}
      >
        <LogOut />
      </Button>
    </div>
  )
}
