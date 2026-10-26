import { Check, X } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { VacancyStatus } from "@/types"

interface ModerationActionsProps {
  status: VacancyStatus
  busy: boolean
  onApprove: () => void
  onReject: (reason: string) => void
}

/** Approve, or reject with a reason the author sees. */
export function ModerationActions({ status, busy, onApprove, onReject }: ModerationActionsProps) {
  const { t } = useTranslation()
  const [rejecting, setRejecting] = useState(false)
  const [text, setText] = useState("")

  if (rejecting) {
    return (
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
    )
  }
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" className="rounded-full" disabled={busy || status === "approved"} onClick={onApprove}>
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
  )
}
