import { UserRound } from "lucide-react"
import { apiUrl } from "@/config/axios"
import { API_ENDPOINTS } from "@/constants"
import { cn } from "@/lib"

/** The student's photo, or a neutral placeholder. */
export function ResumePhoto({ id, className }: { id: string | null | undefined; className?: string }) {
  const box = cn("size-24 shrink-0 rounded-full border bg-muted", className)
  if (!id) {
    return (
      <span className={cn(box, "grid place-items-center text-muted-foreground")}>
        <UserRound className="size-1/2" aria-hidden />
      </span>
    )
  }
  return <img src={apiUrl(API_ENDPOINTS.file(id))} alt="" className={cn(box, "object-cover")} />
}
