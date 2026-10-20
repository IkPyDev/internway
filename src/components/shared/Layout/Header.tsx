import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS, ROUTES } from "@/constants"
import { cn } from "@/lib"
import { useUiStore } from "@/store"
import { LanguageSwitch } from "./LanguageSwitch"
import { Logo } from "./Logo"

export function Header() {
  const { t } = useTranslation()
  const { navOpen, toggleNav, closeNav } = useUiStore()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md backdrop-saturate-150">
      <div className="container-page flex h-18 items-center gap-4">
        <Logo />
        <nav
          id="main-nav"
          aria-label={t("nav.label")}
          className={cn(
            "ml-auto flex gap-1",
            "max-[1360px]:fixed max-[1360px]:inset-x-0 max-[1360px]:top-18 max-[1360px]:flex-col max-[1360px]:border-b max-[1360px]:bg-white max-[1360px]:px-4 max-[1360px]:pt-3 max-[1360px]:pb-5 max-[1360px]:shadow-card max-[1360px]:transition",
            !navOpen && "max-[1360px]:pointer-events-none max-[1360px]:-translate-y-2 max-[1360px]:opacity-0",
          )}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeNav}
              className="rounded-full px-2.5 py-2 text-[0.9rem] font-semibold whitespace-nowrap transition hover:bg-muted max-[1360px]:px-4 max-[1360px]:py-3"
              activeProps={{ className: "bg-navy-900 text-white hover:bg-navy-900" }}
            >
              {t(item.label)}
            </Link>
          ))}
          <Link
            to={ROUTES.login}
            onClick={closeNav}
            className="rounded-full px-4 py-3 font-semibold sm:hidden"
            activeProps={{ className: "bg-navy-900 text-white" }}
          >
            {t("nav.login")}
          </Link>
        </nav>
        <div className="flex items-center gap-2 max-[1360px]:ml-auto">
          <LanguageSwitch />
          <Button asChild variant="outline" className="rounded-full font-bold max-sm:hidden">
            <Link to={ROUTES.login}>{t("nav.login")}</Link>
          </Button>
          <Button asChild className="rounded-full font-bold max-sm:hidden">
            <Link to={ROUTES.students}>{t("nav.start")}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden max-[1360px]:inline-flex"
            aria-label={t("nav.menu")}
            aria-controls="main-nav"
            aria-expanded={navOpen}
            onClick={toggleNav}
          >
            {navOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  )
}
