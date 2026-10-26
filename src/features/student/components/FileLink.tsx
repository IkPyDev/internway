import { FileText } from "lucide-react"
import type { ReactNode } from "react"
import { apiUrl } from "@/config/axios"
import { API_ENDPOINTS } from "@/constants"

/** Opens an uploaded file in a new tab. */
export function FileLink({ id, children }: { id: string; children: ReactNode }) {
  return (
    <a
      href={apiUrl(API_ENDPOINTS.file(id))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:underline"
    >
      <FileText className="size-4 shrink-0" aria-hidden /> {children}
    </a>
  )
}
