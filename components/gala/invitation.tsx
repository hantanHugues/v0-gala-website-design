"use client"

import type React from "react"
import { useState } from "react"
import { Check } from "lucide-react"

export function Invitation() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="invitation"
      className="section-light relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="font-script text-2xl text-royal sm:text-3xl">
            Rejoignez-nous
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl text-balance">
            Demander une Invitation
          </h2>
          <div className="mx-auto mt-6 h-px w-24 hairline" />
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted-foreground text-pretty">
            Les places sont strictement limitées. Renseignez vos informations
            et notre comité reviendra vers vous avec votre confirmation.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border border-royal/20 bg-card shadow-[0_20px_60px_-25px_oklch(0.5_0.2_255/0.45)]">
          {/* royal header band */}
          <div
            className="flex items-center justify-center gap-3 py-4"
            style={{ backgroundColor: "oklch(0.5 0.2 255)" }}
          >
            <span className="h-px w-8 bg-[oklch(0.98_0.005_85)]/50" />
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-[oklch(0.98_0.005_85)]">
              Réponse souhaitée avant le 31 mai 2026
            </span>
            <span className="h-px w-8 bg-[oklch(0.98_0.005_85)]/50" />
          </div>

          <div className="p-8 sm:p-12">
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Prénom" name="firstName" />
                  <Field label="Nom" name="lastName" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Email" name="email" type="email" />
                  <Field label="Téléphone" name="phone" type="tel" />
                </div>
                <Field
                  label="Organisation / Fonction"
                  name="org"
                  required={false}
                />

                <div>
                  <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
                    Nombre de places
                  </label>
                  <select
                    name="seats"
                    className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-royal"
                  >
                    <option>1 place</option>
                    <option>2 places</option>
                    <option>Table (8 places)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-royal py-4 text-xs font-bold uppercase tracking-[0.22em] text-[oklch(0.98_0.005_85)] transition-opacity hover:opacity-90"
                >
                  Envoyer ma demande
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
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
    <div>
      <label className="mb-2 block text-[0.65rem] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-royal"
      />
    </div>
  )
}
