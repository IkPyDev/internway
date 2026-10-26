import { useTranslation } from "react-i18next"
import type { ResumeFields } from "@/types"
import { RESUME_FIELDS } from "../constants"

/** Read-only resume, shown to employers and the admin. Plain text only; empty fields are skipped. */
export function ResumeView({ resume }: { resume: { [K in keyof ResumeFields]?: string | null } }) {
  const { t } = useTranslation()
  return (
    <dl className="grid gap-3 text-sm">
      {RESUME_FIELDS.filter(({ key }) => resume[key]).map(({ key }) => (
        <div key={key}>
          <dt className="font-semibold text-muted-foreground">{t(`resume.fields.${key}`)}</dt>
          <dd className="whitespace-pre-line">{resume[key]}</dd>
        </div>
      ))}
    </dl>
  )
}
