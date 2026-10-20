import { useTranslation } from "react-i18next"
import { Note } from "@/components/shared"

export function Disclaimer() {
  const { t } = useTranslation()
  return <Note>{t("common.disclaimer")}</Note>
}
