import { useTranslation } from "react-i18next"
import type { Currency } from "@/types"
import { salaryText } from "../lib/vacancies"

export function Salary({
  from,
  to,
  currency,
}: {
  from: number | null
  to: number | null
  currency: Currency
}) {
  const { t } = useTranslation()
  const s = salaryText(from, to, currency)
  return <>{t(`salary.${s.key}`, { from: s.from, to: s.to, currency: s.currency })}</>
}
