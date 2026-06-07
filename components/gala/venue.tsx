import { Reveal } from "@/components/reveal"
import { MapPin, Clock, Shirt } from "lucide-react"

const details = [
  { icon: MapPin, label: "Lieu", value: "Cotonou, Bénin" },
  { icon: Clock, label: "Horaire", value: "19h00 — Tard dans la nuit" },
  { icon: Shirt, label: "Dress code", value: "Tenue de soirée exigée" },
]

export function Venue() {
  return (
    <section id="lieu" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Image */}
        <Reveal variant="fade-right" threshold={0.05}>
          <div className="relative min-h-[260px] sm:min-h-[420px] lg:min-h-full">
            <img
              src="/images/galerie-7-6-1-490x325.jpg"
              alt="Salle du gala à Cotonou"
              className="size-full object-cover"
            />
            {/* gradient adapté mobile (to-b) vs desktop (to-r) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 lg:bg-gradient-to-r lg:from-royal/30 lg:via-transparent lg:to-background/80" />

            {/* Location label overlaid on image — mobile only */}
            <div className="absolute bottom-0 inset-x-0 px-4 pb-4 lg:hidden">
              <span className="inline-flex items-center gap-2 rounded-sm bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                <MapPin className="size-3 text-gold" />
                <span className="font-heading text-[0.6rem] uppercase tracking-[0.25em] text-cream">
                  Cotonou, Bénin
                </span>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal variant="fade-left" threshold={0.05} delay={100}>
          <div suppressHydrationWarning className="flex flex-col justify-center bg-card px-6 py-14 sm:px-16">
            <p className="font-script text-4xl text-gold sm:text-5xl">
              Un cadre d&apos;exception
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
              Le Lieu
            </h2>
            <div className="mt-6 h-px w-24 hairline-royal" />

            <p className="mt-8 max-w-md leading-relaxed text-cream/70 text-pretty">
              Au cœur de Cotonou, dans l&apos;un des écrins les plus prestigieux de
              la ville, vivez une soirée à la hauteur de cet anniversaire
              historique. L&apos;adresse exacte sera communiquée aux invités
              confirmés.
            </p>

            {/* Mobile: chips horizontaux */}
            <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
              {details.map((d) => {
                const Icon = d.icon
                return (
                  <div
                    key={d.label}
                    className="flex items-center gap-2 rounded-sm border border-border/60 bg-background/30 px-3 py-2"
                  >
                    <Icon className="size-3.5 shrink-0 text-royal" strokeWidth={1.5} />
                    <span className="text-xs text-cream/80">{d.value}</span>
                  </div>
                )
              })}
            </div>

            {/* Desktop: vertical list */}
            <div className="mt-10 hidden space-y-px overflow-hidden border border-border bg-border lg:block">
              {details.map((d) => {
                const Icon = d.icon
                return (
                  <Reveal key={d.label} variant="fade-up">
                    <div className="flex items-center gap-5 bg-card px-6 py-5">
                      <Icon className="size-6 text-royal" strokeWidth={1.4} />
                      <div suppressHydrationWarning>
                        <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/50">
                          {d.label}
                        </p>
                        <p className="mt-0.5 text-cream">{d.value}</p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
