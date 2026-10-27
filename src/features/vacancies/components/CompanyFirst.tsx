import { Link } from "@tanstack/react-router"
import { Building2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants"

/** Shown instead of posting until the company form is filled in. */
export function CompanyFirst() {
  const { t } = useTranslation()
  return (
    <div className="grid max-w-3xl justify-items-start gap-3 rounded-xl border border-gold/60 bg-gold/10 p-5 sm:p-7">
      <h2 className="flex items-center gap-2 text-lg">
        <Building2 className="size-5 shrink-0 text-navy-700" aria-hidden /> {t("companyFirst.title")}
      </h2>
      <p className="text-sm">{t("companyFirst.text")}</p>
      <Button asChild className="rounded-full font-bold">
        <Link to={ROUTES.company}>{t("companyFirst.action")} →</Link>
      </Button>
    </div>
  )
}
