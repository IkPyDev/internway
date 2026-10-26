import { useTranslation } from "react-i18next"
import { apiErrorCode } from "@/lib"

/** The translated API error of a failed request, if any. */
export function FormError({ error }: { error: unknown }) {
  const { t } = useTranslation()
  if (!error) return null
  return (
    <p role="alert" className="text-sm text-destructive">
      {t(`errors.${apiErrorCode(error)}`)}
    </p>
  )
}
