const stats = [
  { value: "20", label: "Années d'impact" },
  { value: "5 000+", label: "Jeunes leaders formés" },
  { value: "40+", label: "Pays partenaires" },
  { value: "300", label: "Invités d'honneur" },
]

function SectionTitle({
  overline,
  title,
}: {
  overline: string
  title: string
}) {
  return (
    <div className="text-center">
      <p className="font-script text-2xl text-gold sm:text-3xl">{overline}</p>
      <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
        {title}
      </h2>
      <div className="mx-auto mt-6 h-px w-24 hairline" />
    </div>
  )
}

export function About() {
  return (
    <section id="apropos" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle overline="Une soirée mémorable" title="L'Événement" />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden border border-gold/20">
              <img
                src="/images/gala-toast.png"
                alt="Toast au champagne lors du gala"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden border border-gold bg-background px-8 py-6 sm:block">
              <p className="font-heading text-4xl font-bold text-gold">2026</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cream/70">
                L'année de la célébration
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg leading-relaxed text-cream/80 text-pretty">
              Depuis deux décennies, AIESEC in Benin façonne une génération de
              leaders engagés, audacieux et tournés vers l&apos;impact. Ce gala
              anniversaire marque un moment historique&nbsp;: la célébration de
              ce parcours et de toutes les vies transformées.
            </p>
            <p className="mt-6 leading-relaxed text-cream/65 text-pretty">
              Le temps d&apos;une soirée d&apos;exception, nous réunirons celles
              et ceux qui ont écrit cette histoire — alumni, partenaires,
              dirigeants et visionnaires — pour honorer le passé et inspirer les
              vingt prochaines années.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-card px-6 py-8 text-center">
                  <p className="font-heading text-3xl font-bold text-gold sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-cream/60">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
