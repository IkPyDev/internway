import { MapPin } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ABROAD_PHOTOS } from "../constants"

export function AbroadGallery() {
  const { t } = useTranslation()

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
      {ABROAD_PHOTOS.map((p) => (
        <li
          key={p.src}
          className="group relative isolate aspect-[4/5] overflow-hidden rounded-xl bg-navy-950 shadow-card"
        >
          <img
            src={p.src}
            alt={t(p.label)}
            loading="lazy"
            className="absolute inset-0 -z-20 size-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent"
            aria-hidden
          />
          <span className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 p-3 text-sm font-semibold text-white sm:p-5 sm:text-base">
            <MapPin className="size-4 shrink-0 text-gold" aria-hidden />
            {t(p.label)}
          </span>
        </li>
      ))}
    </ul>
  )
}
