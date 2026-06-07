const milestones = [
  {
    year: "2006",
    title: "Les Fondations",
    text: "Naissance d'AIESEC in Benin et des premiers échanges internationaux portés par une poignée de visionnaires.",
  },
  {
    year: "2012",
    title: "L'Expansion",
    text: "Ouverture de nouveaux comités locaux à travers le pays et multiplication des programmes de leadership.",
  },
  {
    year: "2018",
    title: "La Reconnaissance",
    text: "AIESEC in Benin s'impose comme une référence régionale du développement du leadership des jeunes.",
  },
  {
    year: "2026",
    title: "L'Héritage",
    text: "Vingt ans d'impact célébrés lors d'un gala réunissant l'ensemble de la communauté et ses partenaires.",
  },
]

export function Heritage() {
  return (
    <section
      id="heritage"
      className="relative border-y border-border bg-card/40 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-gold sm:text-3xl">
            Notre parcours
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
            Deux Décennies d&apos;Excellence
          </h2>
          <div className="mx-auto mt-6 h-px w-24 hairline" />
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {milestones.map((m, i) => (
            <div key={m.year} className="relative">
              <div className="flex items-center gap-4">
                <span className="font-heading text-2xl font-bold text-gold">
                  {m.year}
                </span>
                <span className="h-px flex-1 bg-gold/25" />
              </div>
              <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-royal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-heading text-xl font-bold text-cream">
                {m.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/60 text-pretty">
                {m.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
