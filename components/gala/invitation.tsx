"use client"

import type React from "react"
import { useState } from "react"
import { Check, User, Mail, Phone, Briefcase, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function Invitation() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="invitation" className="s-invitation relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal variant="fade-up">
          <div className="text-center">
            <p className="font-script text-4xl text-royal sm:text-5xl">
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
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/40 bg-card p-6 shadow-sm sm:p-16">
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
                <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
                    <div className="sm:col-span-6">
                      <ElegantInput placeholder="Prénom" name="firstName" icon={User} />
                    </div>
                    <div className="sm:col-span-6">
                      <ElegantInput placeholder="Nom" name="lastName" icon={User} />
                    </div>
                    <div className="sm:col-span-12">
                      <ElegantInput placeholder="Email" name="email" type="email" icon={Mail} />
                    </div>
                    <div className="sm:col-span-12">
                      <ElegantInput placeholder="Téléphone" name="phone" type="tel" icon={Phone} />
                    </div>
                    <div className="sm:col-span-12" suppressHydrationWarning>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-muted-foreground/50">
                          <Briefcase className="size-4" />
                        </div>
                        <Select name="role">
                          <SelectTrigger className="flex h-[54px] w-full items-center justify-between rounded-xl border border-border bg-transparent py-4 pl-11 pr-4 text-sm font-normal text-foreground outline-none transition-all hover:bg-transparent focus:border-royal focus:ring-1 focus:ring-royal focus-visible:ring-1 focus-visible:ring-royal">
                            <SelectValue placeholder="Votre statut" />
                          </SelectTrigger>
                          <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="aiesecer_tm_tl">AIESECer TM/TL</SelectItem>
                            <SelectItem value="aiesecer_lcp_lcvp">AIESECer LCP/LCVP</SelectItem>
                            <SelectItem value="aiesecer_mcp_mcvp">AIESECer MCP/MCVP</SelectItem>
                            <SelectItem value="alumni">Alumni</SelectItem>
                            <SelectItem value="externe">Externe</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="sm:col-span-12" suppressHydrationWarning>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-muted-foreground/50">
                          <Users className="size-4" />
                        </div>
                        <Select name="seats">
                          <SelectTrigger className="flex h-[54px] w-full items-center justify-between rounded-xl border border-border bg-transparent py-4 pl-11 pr-4 text-sm font-normal text-foreground outline-none transition-all hover:bg-transparent focus:border-royal focus:ring-1 focus:ring-royal focus-visible:ring-1 focus-visible:ring-royal">
                            <SelectValue placeholder="Nombre de places" />
                          </SelectTrigger>
                          <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="solo">Solo</SelectItem>
                            <SelectItem value="couple">Couple</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full rounded-xl border border-[#0266c8]/50 bg-[#0266c8] bg-[linear-gradient(110deg,#0266c8,45%,#3b99f6,55%,#0266c8)] bg-[length:200%_100%] py-4 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_16px_rgba(2,102,200,0.3)] transition-all duration-500 hover:bg-[position:100%_0] active:scale-[0.98]"
                    >
                      Demander mon Invitation
                    </button>
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      Les places étant limitées, votre demande sera soumise à validation.
                    </p>
                  </div>
                </form>
              )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ElegantInput({
  name,
  type = "text",
  placeholder,
  icon: Icon,
  required = true,
}: {
  name: string
  type?: string
  placeholder: string
  icon: any
  required?: boolean
}) {
  return (
    <div className="relative" suppressHydrationWarning>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-muted-foreground/50">
        <Icon className="size-4" />
      </div>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-transparent py-4 pl-11 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground/50 focus:border-royal focus:ring-1 focus:ring-royal"
      />
    </div>
  )
}
