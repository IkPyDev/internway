import { CardGridSkeleton, ErrorState } from "@/components/shared"
import { cn } from "@/lib"
import { useLatestInternships } from "../hooks/useLatestInternships"
import { InternshipCard } from "./InternshipCard"

/** The newest internships as one endless, slowly scrolling row; it pauses under the pointer or focus. */
export function LatestInternships({ limit = 12 }: { limit?: number }) {
  const { items, status, error, refetch } = useLatestInternships(limit)
  if (status === "pending") return <CardGridSkeleton count={4} />
  if (status === "error") return <ErrorState error={error} onRetry={() => refetch()} />
  return (
    <div className="-mx-4 overflow-hidden px-4 py-2 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)] motion-reduce:overflow-x-auto">
      <ul
        className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: `${items.length * 6}s` }}
      >
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item.url}`}
              className={cn("flex w-72 shrink-0 sm:w-80 [&>*]:flex-1", copy === 1 && "motion-reduce:hidden")}
              aria-hidden={copy === 1 || undefined}
              inert={copy === 1 || undefined}
            >
              <InternshipCard item={item} />
            </li>
          )),
        )}
      </ul>
    </div>
  )
}
