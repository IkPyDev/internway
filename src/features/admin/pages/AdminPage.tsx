import { useTranslation } from "react-i18next"
import { FilterPill, FormError, PageShell } from "@/components/shared"
import { ApplicationsTable } from "../components/ApplicationsTable"
import { CompanyQueue } from "../components/CompanyQueue"
import { DetailDialog } from "../components/DetailDialog"
import { Overview } from "../components/Overview"
import { ResumeQueue } from "../components/ResumeQueue"
import { SearchBox } from "../components/SearchBox"
import { UsersTable } from "../components/UsersTable"
import { VacancyQueue } from "../components/VacancyQueue"
import { ADMIN_TABS, MODERATION_FILTERS } from "../constants"
import { useAdminPanel } from "../hooks/useAdminPanel"

const CLEAR_FILTERS = { status: undefined, q: undefined, role: undefined, blocked: undefined }

export function AdminPage() {
  const { t } = useTranslation()
  const { tab, status, q, update, actionError } = useAdminPanel()
  const moderated = tab === "companies" || tab === "resumes" || tab === "vacancies"

  return (
    <PageShell title={t("admin.title")} lead={t("admin.lead")}>
      <div className="mb-4 flex flex-wrap gap-2">
        {ADMIN_TABS.map((key) => (
          <FilterPill
            key={key}
            label={t(`admin.tabs.${key}`)}
            active={tab === key}
            onClick={() => update({ tab: key === "overview" ? undefined : key, ...CLEAR_FILTERS })}
          />
        ))}
      </div>
      {tab !== "overview" && (
        <div className="mb-6 flex flex-wrap items-center gap-2 border-t pt-4">
          <SearchBox value={q} onChange={(value) => update({ q: value || undefined })} />
          {moderated && (
            <>
              <FilterPill
                label={t("common.all")}
                active={!status}
                onClick={() => update({ status: undefined })}
              />
              {MODERATION_FILTERS.map((s) => (
                <FilterPill
                  key={s}
                  label={t(`status.${s}`)}
                  active={status === s}
                  onClick={() => update({ status: s })}
                />
              ))}
            </>
          )}
        </div>
      )}
      <div className="mb-4">
        <FormError error={actionError} />
      </div>
      {tab === "overview" && <Overview />}
      {tab === "companies" && <CompanyQueue />}
      {tab === "resumes" && <ResumeQueue />}
      {tab === "vacancies" && <VacancyQueue />}
      {tab === "users" && <UsersTable />}
      {tab === "applications" && <ApplicationsTable />}
      <DetailDialog />
    </PageShell>
  )
}
