/** Runtime settings read from .env (see .env.example). */
export const appConfig = {
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL ?? "",
  pageSize: 24,
}
