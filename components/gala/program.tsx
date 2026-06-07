"use client"

import { useState } from "react"
import { Wine, Mic, Music, Award, UtensilsCrossed, Sparkles, ChevronDown } from "lucide-react"
import { Reveal } from "@/components/reveal"

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
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="programme" className="s-program relative py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal variant="fade-up">
          <div className="text-center">
            <p className="font-script text-4xl text-royal sm:text-5xl">
              Le déroulé de la soirée
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl text-balance">
              Programme
            </h2>
            <div className="mx-auto mt-6 h-px w-24 hairline" />
          </div>
        </Reveal>

        {/* ── Mobile: accordion timeline ────────────────────── */}
        <Reveal variant="fade-up" delay={100} threshold={0.05}>
          <div className="relative mt-14 lg:hidden">
            {/* vertical connector line */}
            <div className="absolute left-[1.35rem] top-0 h-full w-px bg-gradient-to-b from-transparent via-royal/30 to-transparent" />

            <div className="flex flex-col gap-1">
              {schedule.map((s, i) => {
                const Icon = s.icon
                const isOpen = openIndex === i
                return (
                  <div key={s.title} className="relative pl-12">
                    {/* dot on the timeline */}
                    <div className={`absolute left-[0.9rem] top-4 size-3 -translate-x-1/2 rounded-full border-2 transition-colors duration-300 ${isOpen ? "border-royal bg-royal" : "border-royal/40 bg-background"}`} />

                    <button
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="flex w-full items-center justify-between border-b border-border/50 py-4 text-left transition-colors hover:border-royal/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${isOpen ? "border-royal bg-royal text-[oklch(0.98_0.005_85)]" : "border-royal/25 bg-royal/5 text-royal"}`}>
                          <Icon className="size-4" strokeWidth={1.4} />
                        </span>
                        <div>
                          <span className="block font-heading text-[0.6rem] tracking-[0.25em] text-royal">
                            {s.time}
                          </span>
                          <span className="block font-heading text-base font-bold text-foreground">
                            {s.title}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`size-4 shrink-0 text-royal/60 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* expanded text */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-32 pb-4 pt-2 opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                        {s.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Reveal>

        {/* ── Desktop: card grid ────────────────────────────── */}
        <div className="mt-16 hidden lg:grid lg:gap-px lg:overflow-hidden lg:border lg:border-border lg:bg-border lg:grid-cols-3">
          {schedule.map((s, i) => {
            const Icon = s.icon
            return (
              <Reveal key={s.title} variant="fade-up" delay={i * 75} threshold={0.05}>
                <div className="group relative bg-card p-8 transition-colors hover:bg-card/60 h-full">
                  <span className="absolute inset-x-0 top-0 h-0.5 w-0 bg-royal transition-all duration-500 group-hover:w-full" />
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full border border-royal/25 bg-[oklch(0.5_0.2_255/0.08)] text-royal transition-colors group-hover:bg-royal group-hover:text-[oklch(0.98_0.005_85)]">
                      <Icon className="size-6" strokeWidth={1.4} />
                    </span>
                    <span className="font-heading text-sm font-bold tracking-widest text-royal">
                      {s.time}
                    </span>
                  </div>
                  <h3 className="mt-6 font-heading text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{s.text}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
