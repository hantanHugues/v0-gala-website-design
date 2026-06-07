import { Reveal } from "@/components/reveal"

const stats = [
  { value: "20", label: "Années d'impact" },
  { value: "5 000+", label: "Jeunes leaders formés" },
  { value: "40+", label: "Pays partenaires" },
  { value: "300", label: "Invités d'honneur" },
]

export function About() {
  return (
    <section id="apropos" className="section-light relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-6">

        {/* ── Header ─────────────────────────────────────── */}
        <Reveal variant="fade-up">
          <div className="text-center">
            <p className="font-script text-xl text-royal sm:text-2xl lg:text-3xl">
              Une soirée mémorable
            </p>
            <h2 className="mt-1 font-heading text-2xl font-bold text-foreground sm:mt-2 sm:text-4xl lg:text-5xl text-balance">
              L&apos;Événement
            </h2>
            <div className="mx-auto mt-4 h-px w-14 hairline sm:w-20 lg:w-24" />
          </div>
        </Reveal>

        {/* ── Body — stacked on mobile, side-by-side on lg ── */}
        <div className="mt-10 sm:mt-14 lg:mt-16 grid gap-10 sm:gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* ── Image ──────────────────────────────────────── */}
          <Reveal variant="fade-up" threshold={0.08}>
            {/* relative container for badge overlap on lg+ */}
            <div className="relative lg:pb-8">
              <div className="overflow-hidden border border-royal/20">
                <img
                  src="/images/gala-toast.png"
                  alt="Toast au champagne lors du gala"
                  className="w-full object-cover aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5]"
                />
              </div>

              {/* Badge — always inside/overlaid on image */}
              <div
                className="
                  absolute bottom-3 right-3
                  border border-royal bg-royal/90 px-4 py-2 text-center backdrop-blur-sm
                  sm:bottom-4 sm:right-4 sm:px-5 sm:py-3
                  lg:bottom-2 lg:right-2 lg:px-8 lg:py-5
                "
              >
                <p className="font-heading text-lg font-bold text-[oklch(0.98_0.005_85)] sm:text-2xl lg:text-4xl">
                  2026
                </p>
                <p className="text-[0.5rem] uppercase tracking-[0.15em] text-[oklch(0.98_0.005_85)]/80 lg:mt-1 lg:text-[0.6rem]">
                  Célébration
                </p>
              </div>
            </div>
          </Reveal>

          {/* ── Text ───────────────────────────────────────── */}
          <Reveal variant="fade-up" threshold={0.08} delay={80}>
            <div>
              <p className="text-sm leading-relaxed text-foreground text-pretty sm:text-base lg:text-lg">
                Depuis deux décennies, AIESEC in Benin façonne une génération de
                leaders engagés, audacieux et tournés vers l&apos;impact. Ce gala
                anniversaire marque un moment historique&nbsp;: la célébration de
                ce parcours et de toutes les vies transformées.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:mt-5">
                Le temps d&apos;une soirée d&apos;exception, nous réunirons celles
                et ceux qui ont écrit cette histoire — alumni, partenaires,
                dirigeants et visionnaires — pour honorer le passé et inspirer les
                vingt prochaines années.
              </p>

              {/* ── Stats ────────────────────────────────────── */}
              <div className="mt-8 sm:mt-10">

                {/* Mobile (<sm) : 2×2 grid compact */}
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-border/50 bg-border/50 sm:hidden">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="bg-card/80 px-4 py-5 text-center"
                    >
                      <p className="font-heading text-2xl font-bold text-royal">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[0.55rem] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* sm → lg : 4 colonnes en ligne */}
                <div className="hidden sm:grid sm:grid-cols-4 lg:hidden gap-px overflow-hidden border border-border bg-border">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-card px-3 py-6 text-center">
                      <p className="font-heading text-2xl font-bold text-royal">{s.value}</p>
                      <p className="mt-1.5 text-[0.58rem] uppercase leading-tight tracking-[0.1em] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* lg+ : grille 2×2 */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-px overflow-hidden border border-border bg-border">
                  {stats.map((s) => (
                    <div key={s.label} className="bg-card px-6 py-8 text-center">
                      <p className="font-heading text-3xl font-bold text-royal xl:text-4xl">
                        {s.value}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
