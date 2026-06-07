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
      className="relative overflow-hidden py-24 sm:py-32"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.13 0.02 265) 0%, oklch(0.18 0.06 258) 50%, oklch(0.13 0.02 265) 100%)",
      }}
    >
      {/* soft royal glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,oklch(0.5_0.2_255/0.18)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-gold sm:text-3xl">
            Notre parcours
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
            Deux Décennies d&apos;Excellence
          </h2>
          <div className="mx-auto mt-6 h-px w-24 hairline-royal" />
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className="group relative border-t border-royal/30 pt-6 transition-colors hover:border-gold/60"
            >
              <span className="absolute -top-px left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <p className="font-heading text-[0.7rem] tracking-[0.35em] text-royal">
                {String(i + 1).padStart(2, "0")}
              </p>
              <span className="mt-3 block font-heading text-4xl font-bold gold-gradient-text">
                {m.year}
              </span>
              <h3 className="mt-4 font-heading text-xl font-bold text-cream">
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
