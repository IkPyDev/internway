import { Link } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"

interface CtaBandProps {
  title: string
  text: string
  to: string
  label: string
  /** Background photo under a navy overlay. */
  image?: string
}

export function CtaBand({ title, text, to, label, image }: CtaBandProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-navy-950 via-navy-900 to-navy-700 py-16 text-white sm:py-24">
      {image && (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-20 size-full object-cover object-[center_35%]"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/55"
            aria-hidden
          />
        </>
      )}
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
