import { Link } from "@tanstack/react-router"
import { Search } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { POPULAR_SEARCHES } from "../constants"

export function PopularSearches() {
  const { t } = useTranslation()
  return (
    <ul className="flex flex-wrap gap-3">
      {POPULAR_SEARCHES.map((p) => (
        <li key={p.label}>
          <Link
            to={ROUTES.internships}
            search={p.search}
            className="inline-flex items-center gap-2 rounded-full border-[1.5px] bg-card px-5 py-2.5 font-semibold transition hover:border-navy-900 hover:bg-navy-950 hover:text-white"
          >
            <Search className="size-4 text-gold-700" aria-hidden />
            {t(p.label)}
          </Link>
        </li>
      ))}
    </ul>
  )
}
