import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router"
import { RootLayout } from "@/components/shared"
import { ROUTES } from "@/constants"
import { CompaniesPage, parseCompaniesSearch } from "@/features/companies"
import {
  AboutPage,
  EmployersPage,
  LoginPage,
  NotFoundPage,
  PortfolioPage,
  StudentsPage,
  UniversitiesPage,
} from "@/features/content"
import { HomePage } from "@/features/home"
import { InternshipsPage, parseInternshipsSearch } from "@/features/internships"

const rootRoute = createRootRoute({ component: RootLayout, notFoundComponent: NotFoundPage })

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
const loginRoute = createRoute({ getParentRoute: () => rootRoute, path: ROUTES.login, component: LoginPage })

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
