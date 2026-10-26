import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"
import type { ComponentType } from "react"
import { RootLayout } from "@/components/shared"
import { ROUTES } from "@/constants"
import { AdminPage, parseAdminSearch } from "@/features/admin"
import { AccountButton, LoginPage, parseLoginSearch, RequireRole } from "@/features/auth"
import { CompaniesPage, parseCompaniesSearch } from "@/features/companies"
import { CompanyPage, PublicCompanyPage } from "@/features/company"
import {
  AboutPage,
  EmployersPage,
  NotFoundPage,
  PortfolioPage,
  StudentsPage,
  UniversitiesPage,
} from "@/features/content"
import { HomePage } from "@/features/home"
import { InternshipsPage, parseInternshipsSearch } from "@/features/internships"
import { MyApplicationsPage, ResumePage } from "@/features/student"
import {
  CandidatesPage,
  MyVacanciesPage,
  parseCandidatesSearch,
  parseVacanciesSearch,
  SavedVacanciesPage,
  VacanciesPage,
  VacancyFormPage,
  VacancyPage,
} from "@/features/vacancies"
import type { Role } from "@/types"

/** A page that only the given roles may open. */
const guarded = (roles: Role[], Page: ComponentType) => () => (
  <RequireRole roles={roles}>
    <Page />
  </RequireRole>
)

const rootRoute = createRootRoute({
  component: () => <RootLayout account={<AccountButton />} />,
  notFoundComponent: NotFoundPage,
})

const homeRoute = createRoute({ getParentRoute: () => rootRoute, path: ROUTES.home, component: HomePage })
const internshipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.internships,
  component: InternshipsPage,
  validateSearch: parseInternshipsSearch,
})
const companiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.companies,
  component: CompaniesPage,
  validateSearch: parseCompaniesSearch,
})
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.portfolio,
  component: PortfolioPage,
})
const studentsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.students,
  component: StudentsPage,
})
const employersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.employers,
  component: EmployersPage,
})
const universitiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.universities,
  component: UniversitiesPage,
})
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: ROUTES.about, component: AboutPage })
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.login,
  component: LoginPage,
  validateSearch: parseLoginSearch,
})
const vacanciesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.vacancies,
  component: VacanciesPage,
  validateSearch: parseVacanciesSearch,
})
const vacancyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.vacancy,
  component: VacancyPage,
})
const resumeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.resume,
  component: guarded(["student"], ResumePage),
})
const myApplicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.myApplications,
  component: guarded(["student"], MyApplicationsPage),
})
const myVacanciesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.myVacancies,
  component: guarded(["employer"], MyVacanciesPage),
})
const newVacancyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.newVacancy,
  component: guarded(["employer"], VacancyFormPage),
})
const editVacancyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.editVacancy,
  component: guarded(["employer"], VacancyFormPage),
})
const candidatesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.candidates,
  component: guarded(["employer", "admin"], CandidatesPage),
  validateSearch: parseCandidatesSearch,
})
const savedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.saved,
  component: guarded(["student"], SavedVacanciesPage),
})
const companyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.company,
  component: guarded(["employer"], CompanyPage),
})
const publicCompanyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.publicCompany,
  component: PublicCompanyPage,
})
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.admin,
  component: guarded(["admin"], AdminPage),
  validateSearch: parseAdminSearch,
})

const routeTree = rootRoute.addChildren([
  homeRoute,
  internshipsRoute,
  companiesRoute,
  portfolioRoute,
  studentsRoute,
  employersRoute,
  universitiesRoute,
  aboutRoute,
  loginRoute,
  vacanciesRoute,
  vacancyRoute,
  resumeRoute,
  myApplicationsRoute,
  myVacanciesRoute,
  newVacancyRoute,
  editVacancyRoute,
  candidatesRoute,
  savedRoute,
  companyRoute,
  publicCompanyRoute,
  adminRoute,
])

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
