import { useTranslation } from "react-i18next"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAdminPanel } from "../hooks/useAdminPanel"
import { CompanyDetail } from "./CompanyDetail"
import { UserDetail } from "./UserDetail"
import { VacancyDetail } from "./VacancyDetail"

/** The record opened from any admin list (`?user=`, `?company=` or `?vacancy=` in the URL). */
export function DetailDialog() {
  const { t } = useTranslation()
  const { user, company, vacancy, close } = useAdminPanel()
  const open = Boolean(user || company || vacancy)
  return (
    <Dialog open={open} onOpenChange={(next) => !next && close()}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl" aria-describedby={undefined}>
        <DialogTitle className="sr-only">{t("moderation.details")}</DialogTitle>
        {user && <UserDetail key={`u${user}`} id={user} />}
        {company && <CompanyDetail key={`c${company}`} id={company} />}
        {vacancy && <VacancyDetail key={`v${vacancy}`} id={vacancy} />}
      </DialogContent>
    </Dialog>
  )
}
