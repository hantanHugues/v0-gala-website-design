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
    <section id="programme" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-gold sm:text-3xl">
            Le déroulé de la soirée
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
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
                className="group bg-card p-8 transition-colors hover:bg-secondary"
              >
                <div className="flex items-center justify-between">
                  <Icon className="size-7 text-gold" strokeWidth={1.4} />
                  <span className="font-heading text-sm font-bold tracking-widest text-royal">
                    {s.time}
                  </span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-bold text-cream">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60 text-pretty">
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
