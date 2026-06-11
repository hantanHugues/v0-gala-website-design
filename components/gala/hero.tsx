"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { Countdown } from "./countdown"

import { useLanguage } from "@/lib/i18n"

import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export function Hero() {
  const { t } = useLanguage()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === "dark" : true

  const TypewriterText = ({ text, delay = 0 }: { text: string, delay?: number }) => (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.04, delayChildren: delay },
        },
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )

  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-background">

      {/* ── Background Animations ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      >
        {mounted && isDark && (
          <div className="absolute inset-0 w-full h-full bg-background">
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none h-full w-full object-cover object-center"
            >
              <source src="https://res.cloudinary.com/dqv5nasyj/video/upload/v1781196395/gala_v2/silk-1781194619889.mkv" />
            </video>
          </div>
        )}
        {mounted && !isDark && (
          <div className="absolute inset-0 w-full h-full bg-background">
            <video
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
              controlsList="nodownload nofullscreen noremoteplayback"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none h-full w-full object-cover object-center"
            >
              <source src="https://res.cloudinary.com/dqv5nasyj/video/upload/v1781196436/gala_v2/silk-1781196058717.mkv" />
            </video>
          </div>
        )}
      </motion.div>

      {/* ── Halo protecteur (Lisibilité) ────────────────────
         Ce gradient radial crée un fond opaque au centre (pour les textes)
         qui se dissipe doucement vers les bords pour laisser voir l'animation. */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-background/95 via-background/40 to-transparent" />


      {/* nav spacer — pousse le contenu sous la SiteNav fixe */}
      <div className="h-20 shrink-0 sm:h-24" />


      {/* ── Center — main content ─────────────────────────── */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">

        {/* Big number */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="font-heading text-[6rem] font-black leading-none text-[oklch(0.32_0.12_258)]/30 drop-shadow-sm dark:text-cream/20 sm:text-[10rem] lg:text-[14rem]"
        >
          20
        </motion.span>

        {/* Title overlaid on the big number */}
        <div className="-mt-8 sm:-mt-12 lg:-mt-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="font-heading text-3xl font-bold text-[oklch(0.32_0.12_258)] drop-shadow-sm dark:text-cream sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <p className="mt-3 font-script text-3xl text-gold drop-shadow-sm sm:text-4xl lg:text-5xl">
            <TypewriterText text={t("hero.subtitle_line1")} delay={0.8} />
            <br />
            <TypewriterText text={t("hero.subtitle_line2")} delay={1.5} />
          </p>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 2, ease: "easeInOut" }}
          className="mx-auto mt-8 h-px w-12 bg-gold/40 sm:mt-10 sm:w-16"
        />

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
          className="mt-8 sm:mt-10"
        >
          <Countdown />
        </motion.div>

        {/* Single CTA */}
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: "backOut" }}
          href="#invitation"
          className="mt-10 inline-block border border-gold/50 bg-background/30 px-10 py-4 text-[0.65rem] font-bold uppercase tracking-[0.35em] text-gold shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-gold hover:text-primary-foreground hover:shadow-gold/20 sm:mt-12"
        >
          {t("hero.cta")}
        </motion.a>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-[oklch(0.32_0.12_258)] dark:text-cream/40"
        >
          {t("hero.location_label")}
        </motion.p>
      </div>

      {/* ── Bottom — scroll cue ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <a
          href="#apropos"
          className="flex flex-col items-center gap-2 text-[oklch(0.32_0.12_258)] transition-colors hover:text-gold dark:text-cream/40"
        >
          <span className="text-[0.55rem] font-bold uppercase tracking-[0.4em]">{t("hero.scroll_cue")}</span>
          <span className="block h-8 w-px animate-shimmer bg-gradient-to-b from-[oklch(0.32_0.12_258)] to-transparent dark:from-cream/50" />
        </a>
      </motion.div>
    </section>
  )
}
