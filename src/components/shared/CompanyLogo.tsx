import { Building2 } from "lucide-react"
import { apiUrl } from "@/config/axios"
import { API_ENDPOINTS } from "@/constants"
import { cn } from "@/lib"

/** A company's uploaded logo, or a neutral building icon. */
export function CompanyLogo({ id, className }: { id: string | null | undefined; className?: string }) {
  const box = cn("size-12 shrink-0 rounded-lg border bg-white", className)
  if (!id) {
    return (
      <span className={cn(box, "grid place-items-center text-muted-foreground")}>
        <Building2 className="size-1/2" aria-hidden />
      </span>
    )
  }
  return <img src={apiUrl(API_ENDPOINTS.file(id))} alt="" className={cn(box, "object-contain p-1")} />
}
