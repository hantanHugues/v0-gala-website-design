"use client"

import type React from "react"
import { useState } from "react"
import 'react-phone-number-input/style.css'
import { Check, User, Mail, Phone, Briefcase, Users } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useLanguage } from "@/lib/i18n"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { PhoneInput } from "@/components/ui/phone-input"
import { isValidPhoneNumber, formatPhoneNumberIntl } from "react-phone-number-input"

export function Invitation() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [phoneValue, setPhoneValue] = useState<string | undefined>("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const formData = new FormData(e.currentTarget)
      const data = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: phoneValue ? formatPhoneNumberIntl(phoneValue) : "", // Numéro formaté avec espaces (ex: +229 97 00 00 00)
        role: formData.get("role"),
        ticketType: formData.get("ticket"),
      }

      if (!data.role || !data.ticketType) {
        throw new Error("Veuillez sélectionner un statut et un type de réservation.")
      }

      if (!phoneValue || !isValidPhoneNumber(phoneValue)) {
        throw new Error("Le numéro de téléphone saisi est invalide pour le pays sélectionné.")
      }

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await res.json()

      if (!res.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de l'inscription.")
      }

      setSubmitted(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="invitation" className="s-invitation relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal variant="fade-up">
          <div className="text-center">
            <p className="font-script text-4xl text-royal sm:text-5xl">
              {t("invitation.subtitle")}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-5xl text-balance">
              {t("invitation.title")}
            </h2>
            {/* ornement décoratif */}
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gold/40" />
              <span className="text-gold/60">✦</span>
              <span className="h-px w-10 bg-gold/40" />
            </div>
            <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted-foreground text-pretty">
              {t("invitation.text")}
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
                    {t("invitation.success_title")}
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground text-pretty">
                    {t("invitation.success_text")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-12">
                    <div className="sm:col-span-6">
                      <ElegantInput placeholder={t("invitation.form.firstname")} name="firstName" icon={User} />
                    </div>
                    <div className="sm:col-span-6">
                      <ElegantInput placeholder={t("invitation.form.lastname")} name="lastName" icon={User} />
                    </div>
                    <div className="sm:col-span-12">
                      <ElegantInput placeholder={t("invitation.form.email")} name="email" type="email" icon={Mail} />
                    </div>
                    <div className="sm:col-span-12" suppressHydrationWarning>
                      <div className="relative flex items-center w-full h-[54px] rounded-xl border border-border bg-transparent transition-all focus-within:border-royal focus-within:ring-1 focus-within:ring-royal">
                        <PhoneInput
                          placeholder={t("invitation.form.phone")}
                          value={phoneValue}
                          onChange={setPhoneValue}
                          defaultCountry="BJ"
                          international={false}
                          className="w-full h-full"
                          name="phone"
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-12" suppressHydrationWarning>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-muted-foreground/50">
                          <Briefcase className="size-4" />
                        </div>
                        <Select name="role">
                          <SelectTrigger className="flex h-[54px] w-full items-center justify-between rounded-xl border border-border bg-transparent py-4 pl-11 pr-4 text-sm font-normal text-foreground outline-none transition-all hover:bg-transparent focus:border-royal focus:ring-1 focus:ring-royal focus-visible:ring-1 focus-visible:ring-royal">
                            <SelectValue placeholder={t("invitation.form.role")} />
                          </SelectTrigger>
                          <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="aiesecer_tm_tl">{t("invitation.form.role.a1")}</SelectItem>
                            <SelectItem value="aiesecer_lcp_lcvp">{t("invitation.form.role.a2")}</SelectItem>
                            <SelectItem value="aiesecer_mcp_mcvp">{t("invitation.form.role.a3")}</SelectItem>
                            <SelectItem value="alumni">{t("invitation.form.role.alumni")}</SelectItem>
                            <SelectItem value="externe">{t("invitation.form.role.external")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="sm:col-span-12" suppressHydrationWarning>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-4 text-muted-foreground/50">
                          <Users className="size-4" />
                        </div>
                        <Select name="ticket">
                          <SelectTrigger className="flex h-[54px] w-full items-center justify-between rounded-xl border border-border bg-transparent py-4 pl-11 pr-4 text-sm font-normal text-foreground outline-none transition-all hover:bg-transparent focus:border-royal focus:ring-1 focus:ring-royal focus-visible:ring-1 focus-visible:ring-royal">
                            <SelectValue placeholder={t("invitation.form.ticket_type")} />
                          </SelectTrigger>
                          <SelectContent position="popper" sideOffset={4}>
                            <SelectItem value="solo">{t("invitation.form.ticket.solo")}</SelectItem>
                            <SelectItem value="couple">{t("invitation.form.ticket.couple")}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    {error && (
                      <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-center text-sm text-red-500">
                        {error}
                      </div>
                    )}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl border border-[#0266c8]/50 bg-[#0266c8] bg-[linear-gradient(110deg,#0266c8,45%,#3b99f6,55%,#0266c8)] bg-[length:200%_100%] py-4 text-sm font-semibold text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_6px_16px_rgba(2,102,200,0.3)] transition-all duration-500 hover:bg-[position:100%_0] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Envoi en cours..." : t("invitation.form.submit")}
                    </button>
                    <p className="mt-4 text-center text-xs text-muted-foreground">
                      {t("invitation.form.hint")}
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
