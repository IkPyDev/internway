import { Check, X } from "lucide-react"
import { type ReactNode, useState } from "react"
import { useTranslation } from "react-i18next"
import { StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { VacancyStatus } from "@/types"

interface ModerationCardProps {
  title: string
  meta: string
  status: VacancyStatus
  reason: string | null
  busy: boolean
  onApprove: () => void
  onReject: (reason: string) => void
  children: ReactNode
}

/** One item in a moderation queue: details, then approve or reject with a reason. */
export function ModerationCard({
  title,
  meta,
  status,
  reason,
  busy,
  onApprove,
  onReject,
  children,
}: ModerationCardProps) {
  const { t } = useTranslation()
  const [rejecting, setRejecting] = useState(false)
  const [text, setText] = useState("")

  return (
    <li className="grid gap-3 rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-bold">{title}</p>
          <p className="text-sm break-all text-muted-foreground">{meta}</p>
        </div>
        <StatusBadge status={status} />
      </div>
      {reason && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {t("moderation.reason")}: {reason}
        </p>
      )}
      <details>
        <summary className="cursor-pointer text-sm font-semibold text-navy-700">
          {t("moderation.details")}
        </summary>
        <div className="mt-3">{children}</div>
      </details>
      {rejecting ? (
        <form
          className="grid gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            onReject(text)
            setRejecting(false)
          }}
        >
          <Textarea
            required
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t("moderation.reasonPlaceholder")}
            aria-label={t("moderation.reason")}
          />
          <div className="flex flex-wrap gap-2">
            <Button type="submit" size="sm" variant="destructive" className="rounded-full" disabled={busy}>
              {t("moderation.reject")}
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => setRejecting(false)}
            >
              {t("moderation.cancel")}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            className="rounded-full"
            disabled={busy || status === "approved"}
            onClick={onApprove}
          >
            <Check aria-hidden /> {t("moderation.approve")}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            disabled={busy}
            onClick={() => setRejecting(true)}
          >
            <X aria-hidden /> {t("moderation.reject")}
          </Button>
        </div>
      )}
    </li>
  )
}
