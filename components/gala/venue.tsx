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
        <div className="relative min-h-[400px] lg:min-h-full">
          <img
            src="/images/gala-venue.png"
            alt="Entrée prestigieuse du lieu du gala à Cotonou"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-royal/30 via-transparent to-background/80" />
        </div>

        <div className="flex flex-col justify-center bg-card px-6 py-20 sm:px-16">
          <p className="font-script text-2xl text-gold sm:text-3xl">
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

          <div className="mt-10 space-y-px overflow-hidden border border-border bg-border">
            {details.map((d) => {
              const Icon = d.icon
              return (
                <div
                  key={d.label}
                  className="flex items-center gap-5 bg-card px-6 py-5"
                >
                  <Icon className="size-6 text-royal" strokeWidth={1.4} />
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.25em] text-cream/50">
                      {d.label}
                    </p>
                    <p className="mt-0.5 text-cream">{d.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
