import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

interface CtaBandProps {
  title: string
  text: string
  to: string
  label: string
}

export function CtaBand({ title, text, to, label }: CtaBandProps) {
  return (
    <section className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-700 py-16 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-2 text-mist">{text}</p>
        </div>
        <Button
          asChild
          size="lg"
          className="rounded-full bg-gold px-7 font-bold text-navy-950 hover:bg-gold-hover"
        >
          <Link to={to}>{label}</Link>
        </Button>
      </div>
    </section>
  )
}
