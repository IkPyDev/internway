import { FileUser, Mail } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { ResumePhoto, ResumeView } from "@/features/student"
import type { ApplicationStatus } from "@/types"
import { PIPELINE_ACTIONS } from "../constants"
import type { Candidate } from "../types"

interface CandidateCardProps {
  candidate: Candidate
  canDecide: boolean
  busy: boolean
  onDecide: (status: ApplicationStatus, note: string) => void
}

/** One applicant: letter, resume, a note to them and the next pipeline step. */
export function CandidateCard({ candidate: a, canDecide, busy, onDecide }: CandidateCardProps) {
  const { t } = useTranslation()
  const [note, setNote] = useState(a.employer_note)

  return (
    <li className="card-hover grid gap-3 rounded-xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-3">
        <ResumePhoto id={a.photo_id} className="size-14" />
        <div className="min-w-0 flex-1">
          <p className="font-bold">{a.name || a.email}</p>
          {a.title && <p className="text-sm text-muted-foreground">{a.title}</p>}
          <a
            href={`mailto:${a.email}`}
            className="flex items-center gap-1.5 text-sm break-all text-navy-700 hover:underline"
          >
            <Mail className="size-4 shrink-0" aria-hidden /> {a.email}
          </a>
        </div>
        <StatusBadge status={a.status} />
      </div>
      {a.cover_letter && (
        <p className="rounded-md bg-muted p-3 text-sm whitespace-pre-line">{a.cover_letter}</p>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="w-fit rounded-full">
            <FileUser aria-hidden /> {t("candidates.openResume")}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl" aria-describedby={undefined}>
          <DialogTitle className="sr-only">{t("candidates.resume")}</DialogTitle>
          <ResumeView resume={a} name={a.name || a.email} />
          {a.cover_letter && (
            <div className="grid gap-2 border-t pt-4 text-sm">
              <p className="text-xs font-bold tracking-wide text-muted-foreground uppercase">
                {t("candidates.coverLetter")}
              </p>
              <p className="whitespace-pre-line">{a.cover_letter}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {canDecide && a.status !== "withdrawn" && (
        <div className="grid gap-2 border-t pt-3">
          <Textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("candidates.notePlaceholder")}
            aria-label={t("candidates.note")}
          />
          <div className="flex flex-wrap gap-2">
            {PIPELINE_ACTIONS.map((status) => (
              <Button
                key={status}
                size="sm"
                variant={status === "rejected" ? "outline" : "default"}
                className="rounded-full"
                disabled={busy || a.status === status}
                onClick={() => onDecide(status, note)}
              >
                {t(`candidates.actions.${status}`)}
              </Button>
            ))}
          </div>
        </div>
      )}
    </li>
  )
}
