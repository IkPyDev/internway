import { Link, useLocation } from "@tanstack/react-router"
import { Bookmark, BookmarkCheck, CalendarClock, CircleCheck, Globe, MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { CardGridSkeleton, CompanyLogo, ErrorState, FormError, StatusBadge } from "@/components/shared"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ROUTES } from "@/constants"
import { apiErrorCode, safeUrl } from "@/lib"
import { Salary } from "../components/Salary"
import { UzBadge } from "../components/UzBadge"
import { VacancyFacts } from "../components/VacancyFacts"
import { VacancyTags } from "../components/VacancyTags"
import { useVacancyDetail } from "../hooks/useVacancyDetail"
import { place, splitSkills } from "../lib/vacancies"

export function VacancyPage() {
  const { t } = useTranslation()
  const d = useVacancyDetail()
  const { href } = useLocation()
  const v = d.vacancy

  return (
    <section className="container-page py-10 sm:py-14">
      <Link to={ROUTES.vacancies} className="text-sm font-semibold text-navy-700 hover:underline">
        ← {t("vacancies.back")}
      </Link>
      {d.status === "pending" && <CardGridSkeleton count={2} />}
      {d.status === "error" && <ErrorState error={d.error} onRetry={() => d.refetch()} />}
      {v && (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="grid content-start gap-4">
            {v.status !== "approved" && (
              <div>
                <StatusBadge status={v.status} />
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl">{v.title}</h1>
            {v.department && <p className="-mt-2 text-muted-foreground">{v.department}</p>}
            <p className="text-2xl font-bold">
              {v.paid ? (
                <Salary from={v.salary_from} to={v.salary_to} currency={v.currency} />
              ) : (
                t("vacancies.unpaid")
              )}
            </p>
            {v.uz_eligible && <UzBadge long className="text-sm" />}
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
              {place(v) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" aria-hidden /> {place(v)}
                </span>
              )}
              {v.deadline && (
                <span className="flex items-center gap-1.5">
                  <CalendarClock className="size-4" aria-hidden /> {t("vacancies.deadline")}: {v.deadline}
                </span>
              )}
            </div>
            <VacancyTags
              kind={v.kind}
              schedule={v.schedule}
              employment={v.employment}
              experience={v.experience}
              duration={v.duration}
            />
            <VacancyFacts vacancy={v} className="rounded-xl border bg-card p-5" />
            <h2 className="text-xl">{t("vacancyForm.description")}</h2>
            <p className="leading-relaxed whitespace-pre-line">{v.description}</p>
            {splitSkills(v.skills).length > 0 && (
              <div>
                <h2 className="mb-2 text-xl">{t("vacancies.skills")}</h2>
                <ul className="flex flex-wrap gap-2">
                  {splitSkills(v.skills).map((s) => (
                    <li key={s} className="rounded-full border px-3 py-1 text-sm">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <aside className="grid content-start gap-4 self-start lg:sticky lg:top-24">
            <div className="grid gap-2 rounded-xl border bg-card p-5">
              <Link
                to={ROUTES.publicCompany}
                params={{ id: String(v.company.id) }}
                className="flex items-center gap-3 text-lg font-bold text-navy-700 hover:underline"
              >
                <CompanyLogo id={v.company.logo_id} /> {v.company.name}
              </Link>
              {v.company.industry && <p className="text-sm text-muted-foreground">{v.company.industry}</p>}
              {v.company.description && (
                <p className="line-clamp-4 text-sm whitespace-pre-line">{v.company.description}</p>
              )}
              {v.company.website && (
                <a
                  href={safeUrl(v.company.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm break-all text-navy-700 hover:underline"
                >
                  <Globe className="size-4 shrink-0" aria-hidden /> {v.company.website}
                </a>
              )}
            </div>

            <div className="grid gap-3 rounded-xl border bg-card p-5 shadow-card">
              <h2 className="text-xl">{t("apply.title")}</h2>
              {d.viewer === "visitor" && (
                <>
                  <p className="text-sm text-muted-foreground">{t("apply.signIn")}</p>
                  <Button asChild className="rounded-full font-bold">
                    <Link to={ROUTES.login} search={{ redirect: href }}>
                      {t("nav.login")}
                    </Link>
                  </Button>
                </>
              )}
              {d.viewer === "student" && d.applied && (
                <p className="flex items-center gap-2 font-semibold text-green-700">
                  <CircleCheck className="size-5 shrink-0" aria-hidden /> {t("apply.done")}
                </p>
              )}
              {d.viewer === "student" && !d.applied && (
                <form
                  className="grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    d.submit()
                  }}
                >
                  <Textarea
                    rows={5}
                    value={d.coverLetter}
                    onChange={(e) => d.setCoverLetter(e.target.value)}
                    placeholder={t("apply.coverLetter")}
                    aria-label={t("apply.coverLetter")}
                  />
                  <FormError error={d.applyError} />
                  {apiErrorCode(d.applyError) === "resume_required" && (
                    <Link to={ROUTES.resume} className="text-sm font-semibold text-navy-700 hover:underline">
                      {t("resume.title")} →
                    </Link>
                  )}
                  <Button
                    type="submit"
                    className="rounded-full bg-gold font-bold text-navy-950 hover:bg-gold-hover"
                    disabled={d.applying}
                  >
                    {t("apply.submit")}
                  </Button>
                </form>
              )}
              {d.viewer === "student" && (
                <Button
                  variant="outline"
                  className="rounded-full"
                  aria-pressed={d.saved}
                  disabled={d.saving}
                  onClick={d.toggleSave}
                >
                  {d.saved ? <BookmarkCheck aria-hidden /> : <Bookmark aria-hidden />}
                  {t(d.saved ? "saved.remove" : "saved.add")}
                </Button>
              )}
              {(d.viewer === "employer" || d.viewer === "admin") && (
                <p className="text-sm text-muted-foreground">{t("apply.studentsOnly")}</p>
              )}
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}
