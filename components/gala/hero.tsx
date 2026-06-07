"use client"

import dynamic from "next/dynamic"
import { Countdown } from "./countdown"

const Silk = dynamic(() => import("@/components/silk"), { ssr: false })

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">

      {/* ── Silk WebGL ────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Silk speed={5.9} scale={1} color="#1a3a7a" noiseIntensity={1.5} rotation={1.1} />
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/50 via-background/10 to-background" />

      {/* ── Top bar ──────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-8 sm:px-12 sm:pt-10">
        <span className="font-heading text-xs uppercase tracking-[0.35em] text-cream/50">
          Aiesec · Benin
        </span>
        <span className="font-heading text-xs uppercase tracking-[0.35em] text-cream/50">
          Juin 2026
        </span>
      </div>

      {/* ── Center — main content ─────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">

        {/* Big number */}
        <span className="font-heading text-[6rem] font-black leading-none text-cream/10 sm:text-[10rem] lg:text-[14rem]">
          20
        </span>

        {/* Title overlaid on the big number */}
        <div className="-mt-8 sm:-mt-12 lg:-mt-16">
          <h1 className="font-heading text-3xl font-bold text-cream sm:text-5xl lg:text-6xl">
            Ans d&apos;Impact
          </h1>
          <p className="mt-3 font-script text-xl text-gold sm:text-2xl lg:text-3xl">
            Honorer l&apos;Héritage, Inspirer l&apos;Avenir
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
          className="mt-10 inline-block border border-gold/70 px-10 py-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold transition-all duration-300 hover:bg-gold hover:text-primary-foreground sm:mt-12"
        >
          Réserver ma place
        </a>

        {/* Location */}
        <p className="mt-6 text-[0.6rem] uppercase tracking-[0.4em] text-cream/30">
          Cotonou · Bénin · Tenue de soirée
        </p>
      </div>

      {/* ── Bottom — scroll cue ───────────────────────────── */}
      <div className="relative z-10 flex justify-center pb-8">
        <a
          href="#apropos"
          className="flex flex-col items-center gap-2 text-cream/30 transition-colors hover:text-gold"
        >
          <span className="text-[0.5rem] uppercase tracking-[0.4em]">Découvrir</span>
          <span className="block h-8 w-px animate-shimmer bg-gradient-to-b from-gold/50 to-transparent" />
        </a>
      </div>
    </section>
  )
}
