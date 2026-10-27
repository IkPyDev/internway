import { Link, Outlet } from "@tanstack/react-router"
import { Headset } from "lucide-react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { ROUTES } from "@/constants"
import { Footer } from "./Footer"
import { Header } from "./Header"

/** `account` is the header's sign-in / account slot, filled by the routes layer. */
export function RootLayout({ account }: { account: ReactNode }) {
  const { t } = useTranslation()
  return (
    <>
      <Header account={account} />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <Link
        to={ROUTES.students}
        className="fixed right-4 bottom-4 z-40 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-950 py-3 pr-5 pl-4 font-semibold text-sm text-white shadow-lg transition hover:bg-navy-700 sm:right-6 sm:bottom-6"
      >
        <Headset className="size-5" aria-hidden />
        {t("nav.help")}
      </Link>
    </>
  )
}
