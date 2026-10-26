import axios from "axios"
import { i18n } from "./i18n"

/** The only HTTP client. Base URL is the app's own origin until a backend exists. */
export const apiClient = axios.create({
  // `||`, not `??`: an empty VITE_API_URL would make URLs relative to the current page path.
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.BASE_URL,
  timeout: 20_000,
})

apiClient.interceptors.request.use((config) => {
  config.headers.set("Accept-Language", i18n.language)
  return config
})

/** The absolute URL of an API path, for places that load it without axios (`<img src>`, links). */
export const apiUrl = (path: string) => apiClient.getUri({ url: path })
