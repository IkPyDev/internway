import { useTranslation } from "react-i18next"
import { CtaBand } from "@/components/shared"
import { ROUTES } from "@/constants"

export function NotFoundPage() {
  const { t } = useTranslation()
  return (
    <CtaBand
      title={t("notFound.title")}
      text={t("notFound.text")}
      to={ROUTES.home}
      label={t("notFound.home")}
      image="/img/milan.jpg"
      position="center 60%"
    />
  )
}
