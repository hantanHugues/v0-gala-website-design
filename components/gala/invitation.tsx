"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"
import { Reveal } from "@/components/reveal"

export function Invitation() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="invitation" className="section-light relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal variant="fade-up">
          <div className="text-center">
            <p className="font-script text-2xl text-royal sm:text-3xl">
              Rejoignez-nous
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl text-balance">
              Demander une Invitation
            </h2>
            {/* ornement décoratif */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground text-pretty">
              Les places sont strictement limitées. Renseignez vos informations
              et notre comité reviendra vers vous avec votre confirmation.
            </p>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={100} threshold={0.08}>
          <div className="mt-12 overflow-hidden border border-royal/20 bg-card shadow-[0_20px_60px_-25px_oklch(0.5_0.2_255/0.45)]">
            {/* royal header band */}
            <div
              className="flex items-center justify-center gap-3 py-4"
              style={{ backgroundColor: "oklch(0.5 0.2 255)" }}
            >
              <span className="h-px w-8 bg-[oklch(0.98_0.005_85)]/50" />
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[oklch(0.98_0.005_85)]">
                Places limitées — Juin 2026
              </span>
              <span className="h-px w-8 bg-[oklch(0.98_0.005_85)]/50" />
            </div>

            <div className="p-6 sm:p-12">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex size-16 items-center justify-center rounded-full bg-royal text-[oklch(0.98_0.005_85)]">
                    <Check className="size-8" />
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">
                    Demande envoyée
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground text-pretty">
                    Merci pour votre intérêt. Notre comité examinera votre demande
                    et vous recontactera très prochainement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxeField label="Prénom" name="firstName" />
                    <LuxeField label="Nom" name="lastName" />
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <LuxeField label="Email" name="email" type="email" />
                    <LuxeField label="Téléphone" name="phone" type="tel" />
                  </div>
                  <LuxeField label="Organisation / Fonction" name="org" required={false} />

                  <div className="relative">
                    <label className="mb-1 block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                      Nombre de places
                    </label>
                    <div className="relative">
                      <select
                        name="seats"
                        className="w-full appearance-none border-0 border-b border-border bg-transparent pb-2 pt-1 text-sm text-foreground outline-none transition-colors focus:border-royal"
                      >
                        <option>1 place</option>
                        <option>2 places</option>
                        <option>Table (8 places)</option>
                      </select>
                      {/* custom chevron */}
                      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-gold/60 text-xs">▾</span>
                      {/* animated underline */}
                      <span className="absolute bottom-0 left-0 h-px w-0 bg-royal transition-all duration-300 peer-focus:w-full" />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-royal py-4 text-xs font-bold uppercase tracking-[0.22em] text-[oklch(0.98_0.005_85)] transition-opacity hover:opacity-90"
                    >
                      Envoyer ma demande
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function LuxeField({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div className="group relative">
      <label className="mb-1 block text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground transition-colors group-focus-within:text-royal">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          required={required}
          className="peer w-full border-0 border-b border-border bg-transparent pb-2 pt-1 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/40 focus:border-transparent"
        />
        {/* animated underline — slides in from left on focus */}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-royal transition-all duration-300 ease-out peer-focus:w-full" />
      </div>
    </div>
  )
}
