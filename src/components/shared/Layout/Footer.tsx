import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { Logo } from "./Logo"

const COLUMNS = [
  { title: "footer.platform", links: [ROUTES.internships, ROUTES.companies, ROUTES.portfolio] },
  { title: "footer.partnership", links: [ROUTES.employers, ROUTES.universities] },
  { title: "footer.company", links: [ROUTES.about] },
] as const

const LINK_LABELS: Record<string, string> = {
  [ROUTES.internships]: "nav.internships",
  [ROUTES.companies]: "nav.companies",
  [ROUTES.portfolio]: "nav.portfolio",
  [ROUTES.employers]: "nav.employers",
  [ROUTES.universities]: "nav.universities",
  [ROUTES.about]: "footer.aboutCompany",
}

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-navy-950 pt-16 pb-6 text-mist">
      <div className="container-page grid gap-8 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo inverted />
          <p className="mt-3 max-w-sm text-mist/70">{t("footer.about")}</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 font-bold text-white">{t(col.title)}</h4>
            {col.links.map((to) => (
              <Link key={to} to={to} className="block py-1 text-sm hover:text-white">
                {t(LINK_LABELS[to])}
              </Link>
            ))}
          </div>
        ))}
      </div>
      <div className="container-page mt-12 flex flex-wrap justify-between gap-4 border-t border-white/10 pt-5 text-xs text-mist/70">
        <span>© {new Date().getFullYear()} InternWay</span>
        <span>{t("footer.disclaimer")}</span>
      </div>
    </footer>
  )
}
