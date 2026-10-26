import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { NAV_ITEMS, ROUTES } from "@/constants"
import { cn } from "@/lib"
import { useUiStore } from "@/store"
import { LanguageSwitch } from "./LanguageSwitch"
import { Logo } from "./Logo"

export function Header({ account }: { account: ReactNode }) {
  const { t } = useTranslation()
  const { navOpen, toggleNav, closeNav } = useUiStore()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/85 backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto flex h-18 w-[min(1640px,100%-32px)] items-center gap-4">
        <Logo />
        <nav
          id="main-nav"
          aria-label={t("nav.label")}
          className={cn(
            "ml-auto flex gap-1",
            "max-[1680px]:fixed max-[1680px]:inset-x-0 max-[1680px]:top-18 max-[1680px]:flex-col max-[1680px]:border-b max-[1680px]:bg-white max-[1680px]:px-4 max-[1680px]:pt-3 max-[1680px]:pb-5 max-[1680px]:shadow-card max-[1680px]:transition",
            !navOpen && "max-[1680px]:pointer-events-none max-[1680px]:-translate-y-2 max-[1680px]:opacity-0",
          )}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeNav}
              className="rounded-full px-2.5 py-2 text-[0.9rem] font-semibold whitespace-nowrap transition hover:bg-muted max-[1680px]:px-4 max-[1680px]:py-3"
              activeProps={{ className: "bg-navy-900 text-white hover:bg-navy-900" }}
            >
              {t(item.label)}
            </Link>
          ))}
          {/* On phones the account controls live in the drawer: the header row has no room. */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions lint/a11y/useKeyWithClickEvents: closes the drawer after a link or button inside was used */}
          <div className="border-t px-4 pt-4 sm:hidden" onClick={closeNav}>
            {account}
          </div>
        </nav>
        <div className="flex items-center gap-2 max-[1680px]:ml-auto">
          <LanguageSwitch />
          <div className="max-sm:hidden">{account}</div>
          <Button asChild className="rounded-full font-bold max-sm:hidden">
            <Link to={ROUTES.students}>{t("nav.start")}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hidden max-[1680px]:inline-flex"
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
