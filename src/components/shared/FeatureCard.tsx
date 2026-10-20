import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  text: string
}

export function FeatureCard({ icon: Icon, title, text }: FeatureCardProps) {
  return (
    <article className="rounded-xl border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:shadow-card">
      <div className="mb-5 grid size-13 place-items-center rounded-lg bg-gradient-to-br from-navy-900 to-navy-500 text-white">
        <Icon className="size-6" aria-hidden />
      </div>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-muted-foreground">{text}</p>
    </article>
  )
}
