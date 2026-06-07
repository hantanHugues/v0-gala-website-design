"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Countdown } from "./countdown"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

/* Couleur Silk par thème :
   Dark  → navy profond pour le fond sombre
   Light → doré champagne chaud sur fond ivoire */
const SILK_DARK = "#1a3a7a"
const SILK_LIGHT = "#ffffff"   // blanc pur, fond clair

export function Hero() {
  const [silkColor, setSilkColor] = useState(SILK_DARK)

  useEffect(() => {
    const update = () => {
      const dark = document.documentElement.classList.contains("dark")
      // Si pas de classe dark ET système en light mode → couleur light
      const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches
      setSilkColor(!dark && systemLight ? SILK_LIGHT : SILK_DARK)
    }
    update()

    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const mq = window.matchMedia("(prefers-color-scheme: light)")
    mq.addEventListener("change", update)

    return () => { observer.disconnect(); mq.removeEventListener("change", update) }
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">

      {/* ── Silk WebGL ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Silk speed={2.5} scale={1} color={silkColor} noiseIntensity={1.5} rotation={1.1} />
      </div>

      {/* ── Halo protecteur (Lisibilité) ────────────────────
         Ce gradient radial crée un fond opaque au centre (pour les textes)
         qui se dissipe doucement vers les bords pour laisser voir l'animation. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-background/95 via-background/40 to-transparent" />


      {/* nav spacer — pousse le contenu sous la SiteNav fixe */}
      <div className="h-20 shrink-0 sm:h-24" />


      {/* ── Center — main content ─────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">

        {/* Big number */}
        <span className="font-heading text-[6rem] font-black leading-none text-[oklch(0.32_0.12_258)]/30 drop-shadow-sm dark:text-cream/20 sm:text-[10rem] lg:text-[14rem]">
          20
        </span>

        {/* Title overlaid on the big number */}
        <div className="-mt-8 sm:-mt-12 lg:-mt-16">
          <h1 className="font-heading text-3xl font-bold text-[oklch(0.32_0.12_258)] drop-shadow-sm dark:text-cream sm:text-5xl lg:text-6xl">
            Ans d&apos;Impact
          </h1>
          <p className="mt-3 font-script text-3xl text-gold drop-shadow-sm sm:text-4xl lg:text-5xl">
            Honorer l&apos;Héritage,
            <br />
            Inspirer l&apos;Avenir
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-8 h-px w-12 bg-gold/40 sm:mt-10 sm:w-16" />

        {/* Countdown */}
        <div className="mt-8 sm:mt-10">
          <Countdown />
        </div>

        {/* Single CTA */}
        <a
          href="#invitation"
          className="mt-10 inline-block border border-gold/50 bg-background/30 px-10 py-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-primary-foreground hover:shadow-gold/20 sm:mt-12"
        >
          Réserver ma place
        </a>

        {/* Location */}
        <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[oklch(0.32_0.12_258)] dark:text-cream/40">
          Cotonou · Bénin · Tenue de soirée
        </p>
      </div>

      {/* ── Bottom — scroll cue ───────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <a
          href="#apropos"
          className="flex flex-col items-center gap-2 text-[oklch(0.32_0.12_258)] transition-colors hover:text-gold dark:text-cream/40"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em]">Découvrir</span>
          <span className="block h-8 w-px animate-shimmer bg-gradient-to-b from-[oklch(0.32_0.12_258)] to-transparent dark:from-cream/50" />
        </a>
      </div>
    </section>
  )
}
