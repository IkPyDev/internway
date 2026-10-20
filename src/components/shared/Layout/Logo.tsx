import { Link } from "@tanstack/react-router"
import { ROUTES } from "@/constants"
import { cn } from "@/lib"

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to={ROUTES.home}
      className="flex shrink-0 items-center gap-2.5 text-[1.35rem] font-extrabold tracking-tight"
      aria-label="InternWay"
    >
      <img
        src="/img/logo.jpg"
        alt=""
        width={40}
        height={42}
        className={cn(
          "h-[42px] w-10 object-contain",
          inverted ? "rounded-md bg-white p-0.5" : "mix-blend-multiply",
        )}
      />
      <span className={inverted ? "text-white" : "text-navy-900"}>
        Intern<span className={inverted ? "text-gold" : "text-green-500"}>Way</span>
      </span>
    </Link>
  )
}
