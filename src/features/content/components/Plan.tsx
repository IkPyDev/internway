import { Link } from "@tanstack/react-router"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib"

interface PlanProps {
  name: string
  price: string
  text: string
  items: string[]
  cta: string
  to: string
  hash?: string
  flag?: string
}

export function Plan({ name, price, text, items, cta, to, hash, flag }: PlanProps) {
  return (
    <article
      className={cn(
        "card-hover relative flex flex-col rounded-xl border-[1.5px] bg-card p-8",
        flag && "border-gold shadow-[0_20px_50px_rgb(232_188_74/22%)]",
      )}
    >
      {flag && (
        <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-extrabold text-navy-950">
          {flag}
        </span>
      )}
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="mt-1 text-2xl font-extrabold text-navy-900">{price}</p>
      <p className="mt-1 text-muted-foreground">{text}</p>
      <ul className="my-6 grid gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-green-100 text-green-600">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>
      <Button
        asChild
        variant={flag ? "default" : "outline"}
        className={cn("mt-auto rounded-full font-bold", flag && "bg-gold text-navy-950 hover:bg-gold-hover")}
      >
        <Link to={to} hash={hash}>
          {cta}
        </Link>
      </Button>
    </article>
  )
}
