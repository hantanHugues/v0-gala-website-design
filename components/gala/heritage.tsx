import { Reveal } from "@/components/reveal"
import { DynamicRipple } from "@/components/ui/dynamic-ripple"

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
      className="heritage-bg relative overflow-hidden"
    >
      {/* DynamicRipple — subtil, couleurs royal/or à très faible opacité */}
      <DynamicRipple
        theme="custom"
        customColors={{
          primary: "rgba(80, 120, 230, 0.35)",
          secondary: "rgba(200, 165, 80, 0.25)",
        }}
        intensity={2}
        speed={2}
        reactToCursor={true}
        autoAnimate={true}
        gradientOverlay={false}
        rounded="none"
        className="w-full py-24 sm:py-32"
      >
        {/* soft radial glow — par-dessus le canvas ripple */}
        {/* ── Orbes flottants animés ────────────────────── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Orbe 1 — bleu royal, drift haut-gauche → bas-droite */}
          <div className="heritage-orb-1 absolute size-[380px] rounded-full bg-[radial-gradient(circle,oklch(0.52_0.22_252/0.22)_0%,transparent_70%)] blur-3xl" />
          {/* Orbe 2 — or, drift bas-droite → haut-gauche */}
          <div className="heritage-orb-2 absolute size-[280px] rounded-full bg-[radial-gradient(circle,oklch(0.72_0.14_85/0.15)_0%,transparent_70%)] blur-3xl" />
          {/* Orbe 3 — bleu profond, drift circulaire centre */}
          <div className="heritage-orb-3 absolute size-[460px] rounded-full bg-[radial-gradient(circle,oklch(0.45_0.2_258/0.14)_0%,transparent_70%)] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <Reveal variant="fade-up">
            <div className="text-center">
              <p className="font-script text-4xl text-gold sm:text-5xl">Notre parcours</p>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground dark:text-cream sm:text-5xl text-balance">
                Deux Décennies d&apos;Excellence
              </h2>
              <div className="mx-auto mt-6 h-px w-24 hairline-royal" />
            </div>
          </Reveal>

          {/* ── Mobile: vertical timeline ─────────────────────── */}
          <div className="relative mt-16 sm:hidden">
            {/* central gold line */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

            <div className="flex flex-col gap-0">
              {milestones.map((m, i) => {
                const isLeft = i % 2 === 0
                return (
                  <Reveal key={m.year} variant="fade-up" delay={i * 100} threshold={0.08}>
                    <div className={`relative flex items-start gap-4 pb-12 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
                      {/* content side */}
                      <div className={`w-[calc(50%-20px)] ${isLeft ? "text-right" : "text-left"}`}>
                        <span className="block font-heading text-[0.6rem] tracking-[0.3em] text-royal">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block font-heading text-2xl font-bold gold-gradient-text">
                          {m.year}
                        </span>
                        <h3 className="mt-2 font-heading text-base font-bold text-foreground dark:text-cream">{m.title}</h3>
                        <p className="mt-2 text-xs leading-relaxed text-foreground/55 dark:text-cream/55 text-pretty">{m.text}</p>
                      </div>

                      {/* central dot */}
                      <div className="relative z-10 flex shrink-0 flex-col items-center">
                        <div className="size-3 rounded-full border-2 border-gold bg-background shadow-[0_0_8px_oklch(0.78_0.12_85/0.6)]" />
                      </div>

                      {/* empty side */}
                      <div className="w-[calc(50%-20px)]" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>

          {/* ── Desktop: horizontal cards grid ───────────────── */}
          <div className="mt-20 hidden sm:grid sm:gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {milestones.map((m, i) => (
              <Reveal key={m.year} variant="fade-up" delay={i * 100}>
                <div className="group relative border-t border-royal/30 pt-6 transition-colors hover:border-gold/60">
                  <span className="absolute -top-px left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                  <p className="font-heading text-[0.7rem] tracking-[0.35em] text-royal">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <span className="mt-3 block font-heading text-4xl font-bold gold-gradient-text">
                    {m.year}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground dark:text-cream">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/60 dark:text-cream/60 text-pretty">{m.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </DynamicRipple>
    </section>
  )
}
