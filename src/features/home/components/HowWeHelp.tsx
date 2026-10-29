import { Search, Send, UserRound } from "lucide-react"
import { Trans, useTranslation } from "react-i18next"

const STEPS = [
  { key: "profile", icon: UserRound },
  { key: "find", icon: Search },
  { key: "apply", icon: Send },
] as const

/** Low-contrast city skyline along the bottom edge of the navy band. */
function Skyline() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 h-24 w-full sm:h-36"
      viewBox="0 0 1200 150"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <g fill="#fff" fillOpacity=".07">
        <rect x="0" y="95" width="70" height="55" />
        <rect x="80" y="70" width="55" height="80" />
        <rect x="145" y="105" width="80" height="45" />
        <rect x="235" y="60" width="50" height="90" />
        <path d="M300 150v-55a45 45 0 0 1 90 0v55z" />
        <rect x="342" y="30" width="6" height="22" />
        <rect x="400" y="20" width="14" height="130" />
        <rect x="430" y="85" width="90" height="65" />
        <rect x="530" y="55" width="55" height="95" />
        <rect x="595" y="100" width="70" height="50" />
        <path d="M690 150v-50a55 55 0 0 1 110 0v50z" />
        <rect x="742" y="24" width="6" height="22" />
        <rect x="815" y="50" width="16" height="100" />
        <rect x="845" y="90" width="70" height="60" />
        <rect x="925" y="65" width="55" height="85" />
        <rect x="990" y="105" width="80" height="45" />
        <rect x="1080" y="75" width="55" height="75" />
        <rect x="1145" y="100" width="60" height="50" />
      </g>
    </svg>
  )
}

/** Home "How we help": three numbered steps on a navy band with a faint skyline. */
export function HowWeHelp() {
  const { t } = useTranslation()
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <Skyline />
      <div className="container-page relative pt-14 pb-32 sm:pt-20 sm:pb-44">
        <h2 className="text-4xl text-white sm:text-5xl">{t("home.directions.title")}</h2>
        <p className="mt-3 mb-10 max-w-[52ch] text-lg text-[#c9d6e6] sm:text-xl">
          <Trans i18nKey="home.directions.lead" components={{ b: <b className="font-medium text-gold" /> }} />
        </p>
        <div className="grid gap-5 md:grid-cols-3">
          {STEPS.map(({ key, icon: Icon }, i) => (
            <div
              key={key}
              className="rounded-3xl bg-card p-7 text-foreground shadow-[0_18px_40px_rgb(0_0_0/25%)]"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-navy-900 text-white">
                  <Icon className="size-7" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="font-serif text-5xl leading-none text-[#dfe6ef]" aria-hidden>
                  {i + 1}
                </span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{t(`home.directions.${key}.title`)}</h3>
              <p className="text-muted-foreground">{t(`home.directions.${key}.text`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
