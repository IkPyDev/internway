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
} as const

export const NAV_ITEMS = [
  { to: ROUTES.internships, label: "nav.internships" },
  { to: ROUTES.companies, label: "nav.companies" },
  { to: ROUTES.portfolio, label: "nav.portfolio" },
  { to: ROUTES.students, label: "nav.students" },
  { to: ROUTES.employers, label: "nav.employers" },
  { to: ROUTES.universities, label: "nav.universities" },
  { to: ROUTES.about, label: "nav.about" },
] as const

export const LANGUAGES = [
  { value: "uz", label: "O'z" },
  { value: "ru", label: "Ру" },
] as const
