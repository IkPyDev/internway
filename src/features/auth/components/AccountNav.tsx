import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import type { Role } from "@/types"
import { ACCOUNT_LINKS } from "../constants"

/** Cabinet tabs under the header; hidden when a role has a single page. */
export function AccountNav({ role }: { role: Role }) {
  const { t } = useTranslation()
  const links = ACCOUNT_LINKS[role]
  if (links.length < 2) return null
  return (
    <nav aria-label={t("auth.account")} className="border-b bg-muted/60">
      <div className="container-page flex gap-1 overflow-x-auto py-2">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition hover:bg-white"
            activeProps={{ className: "bg-white text-navy-900 shadow-sm" }}
            activeOptions={{ exact: false }}
          >
            {t(l.label)}
          </Link>
        ))}
      </div>
    </nav>
  )
}
