/** Route paths, used by the route table and every link. */
export const ROUTES = {
  home: "/",
  internships: "/internships",
  companies: "/companies",
  portfolio: "/portfolio",
  students: "/students",
  employers: "/employers",
  universities: "/universities",
  about: "/about",
  login: "/login",
  vacancies: "/vacancies",
  vacancy: "/vacancies/$id",
  resume: "/account/resume",
  myApplications: "/account/applications",
  myVacancies: "/account/vacancies",
  newVacancy: "/account/vacancies/new",
  editVacancy: "/account/vacancies/$id/edit",
  candidates: "/account/vacancies/$id/candidates",
  saved: "/account/saved",
  company: "/account/company",
  publicCompany: "/company/$id",
  admin: "/admin",
} as const

export const NAV_ITEMS = [
  { to: ROUTES.vacancies, label: "nav.vacancies" },
  { to: ROUTES.internships, label: "nav.internships" },
  { to: ROUTES.companies, label: "nav.companies" },
  { to: ROUTES.portfolio, label: "nav.portfolio" },
  { to: ROUTES.students, label: "nav.students" },
  { to: ROUTES.employers, label: "nav.employers" },
  { to: ROUTES.universities, label: "nav.universities" },
  { to: ROUTES.about, label: "nav.about" },
] as const

export const LANGUAGES = [
  { value: "uz", label: "O'z", name: "O'zbekcha" },
  { value: "en", label: "En", name: "English" },
  { value: "ru", label: "Ру", name: "Русский" },
] as const
