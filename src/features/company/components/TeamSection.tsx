import { Crown, Trash2, UserPlus, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import { FormError } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Invite, Member } from "../types"

interface TeamSectionProps {
  members: Member[]
  invites: Invite[]
  canEdit: boolean
  busy: boolean
  error: unknown
  email: string
  onEmail: (email: string) => void
  onInvite: () => void
  onCancelInvite: (id: number) => void
  onRemove: (id: number) => void
}

/** Managers of the company; the owner invites and removes them. */
export function TeamSection(p: TeamSectionProps) {
  const { t } = useTranslation()
  return (
    <section className="grid gap-4 rounded-xl border bg-card p-5 sm:p-7">
      <div>
        <h2 className="text-2xl">{t("company.team.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("company.team.lead")}</p>
      </div>
      <ul className="grid gap-2">
        {p.members.map((m) => (
          <li key={m.id} className="flex flex-wrap items-center gap-3 rounded-lg border p-3">
            <div className="min-w-0 flex-1">
              <p className="font-semibold break-all">{m.name || m.email}</p>
              <p className="text-sm break-all text-muted-foreground">{m.email}</p>
            </div>
            {m.isOwner ? (
              <span className="flex items-center gap-1 text-xs font-bold text-amber-700">
                <Crown className="size-4" aria-hidden /> {t("company.team.owner")}
              </span>
            ) : (
              p.canEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  disabled={p.busy}
                  onClick={() => p.onRemove(m.id)}
                >
                  <Trash2 aria-hidden /> {t("company.team.remove")}
                </Button>
              )
            )}
          </li>
        ))}
        {p.invites.map((i) => (
          <li
            key={`i${i.id}`}
            className="flex flex-wrap items-center gap-3 rounded-lg border border-dashed p-3"
          >
            <div className="min-w-0 flex-1">
              <p className="break-all">{i.email}</p>
              <p className="text-xs text-muted-foreground">{t("company.team.invited")}</p>
            </div>
            {p.canEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full"
                disabled={p.busy}
                onClick={() => p.onCancelInvite(i.id)}
              >
                <X aria-hidden /> {t("company.team.cancel")}
              </Button>
            )}
          </li>
        ))}
      </ul>
      {p.canEdit && (
        <form
          className="grid gap-2 sm:flex"
          onSubmit={(e) => {
            e.preventDefault()
            p.onInvite()
          }}
        >
          <Input
            type="email"
            required
            value={p.email}
            onChange={(e) => p.onEmail(e.target.value)}
            placeholder={t("company.team.emailPlaceholder")}
            aria-label={t("company.team.emailPlaceholder")}
          />
          <Button type="submit" className="rounded-full font-bold" disabled={p.busy}>
            <UserPlus aria-hidden /> {t("company.team.invite")}
          </Button>
        </form>
      )}
      {p.canEdit && <p className="text-xs text-muted-foreground">{t("company.team.inviteHint")}</p>}
      <FormError error={p.error} />
    </section>
  )
}
