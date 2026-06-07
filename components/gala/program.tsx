import { Wine, Mic, Music, Award, UtensilsCrossed, Sparkles } from "lucide-react"

const schedule = [
  {
    time: "19h00",
    title: "Cocktail de Bienvenue",
    text: "Réception au champagne et networking dans les salons d'honneur.",
    icon: Wine,
  },
  {
    time: "20h00",
    title: "Cérémonie d'Ouverture",
    text: "Discours inauguraux et rétrospective des 20 ans d'impact.",
    icon: Mic,
  },
  {
    time: "20h45",
    title: "Dîner de Gala",
    text: "Un menu gastronomique servi dans un cadre raffiné et intimiste.",
    icon: UtensilsCrossed,
  },
  {
    time: "22h00",
    title: "Cérémonie des Récompenses",
    text: "Hommage aux alumni, partenaires et figures emblématiques.",
    icon: Award,
  },
  {
    time: "22h45",
    title: "Performances Live",
    text: "Spectacles d'artistes invités et moments d'émotion.",
    icon: Sparkles,
  },
  {
    time: "23h30",
    title: "Soirée Dansante",
    text: "DJ set et célébration jusqu'au bout de la nuit.",
    icon: Music,
  },
]

export function Program() {
  return (
    <section
      id="programme"
      className="section-light relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-royal sm:text-3xl">
            Le déroulé de la soirée
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl text-balance">
            Programme
          </h2>
          <div className="mx-auto mt-6 h-px w-24 hairline" />
        </div>

        <div className="mt-16 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {schedule.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.title}
                className="group relative bg-card p-8 transition-colors hover:bg-[oklch(0.95_0.02_255)]"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 w-0 bg-royal transition-all duration-500 group-hover:w-full" />
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-full border border-royal/25 bg-[oklch(0.5_0.2_255/0.08)] text-royal transition-colors group-hover:bg-royal group-hover:text-[oklch(0.98_0.005_85)]">
                    <Icon className="size-6" strokeWidth={1.4} />
                  </span>
                  <span className="font-heading text-sm font-bold tracking-widest text-royal">
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {s.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
