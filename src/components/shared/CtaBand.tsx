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
    <section className="bg-gradient-to-r from-navy-900 via-navy-700 to-green-600 py-16 text-white">
      <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl font-extrabold">{title}</h2>
          <p className="mt-2 text-[#d6def7]">{text}</p>
        </div>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="rounded-full bg-white px-7 font-bold text-navy-900"
        >
          <Link to={to}>{label}</Link>
        </Button>
      </div>
    </section>
  )
}
