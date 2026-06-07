import { Countdown } from "./countdown"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Animated silk background — royal blue + gold aurora */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="silk" />
        <div className="silk silk-2" />
        <div className="silk-noise" />
        {/* vignette to keep text legible and the mood sober */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/15 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,var(--background)_88%)]" />
      </div>

      {/* thin royal frame */}
      <div className="pointer-events-none absolute inset-4 z-10 border border-gold/15 sm:inset-6" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="font-script text-3xl text-gold sm:text-4xl">
          AIESEC in Benin présente
        </p>

        <div className="mx-auto my-6 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-royal" />
          <span className="text-xs uppercase tracking-[0.4em] text-cream/80">
            Gala Anniversaire
          </span>
          <span className="h-px w-12 bg-royal" />
        </div>

        <h1 className="font-heading text-5xl font-bold leading-[1.05] text-cream text-balance sm:text-7xl lg:text-8xl">
          20 Ans
          <span className="mt-2 block gold-gradient-text">d&apos;Impact</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg text-pretty">
          Une soirée d&apos;exception réunissant leaders, entrepreneurs et
          décideurs internationaux pour célébrer deux décennies de
          développement du leadership des jeunes au Bénin.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 text-cream sm:flex-row sm:gap-8">
          <span className="text-sm uppercase tracking-[0.2em]">Juin 2026</span>
          <span className="hidden size-1.5 rotate-45 bg-royal sm:block" />
          <span className="text-sm uppercase tracking-[0.2em]">
            Cotonou, Bénin
          </span>
        </div>

        <div className="mt-14">
          <Countdown />
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#invitation"
            className="inline-block bg-gold px-10 py-4 text-xs font-bold uppercase tracking-[0.22em] text-primary-foreground transition-all hover:opacity-90"
          >
            Réserver votre place
          </a>
          <a
            href="#apropos"
            className="inline-block border border-royal/60 px-10 py-4 text-xs font-bold uppercase tracking-[0.22em] text-cream transition-colors hover:border-royal hover:bg-royal/10"
          >
            Découvrir le gala
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="block h-10 w-px animate-shimmer bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  )
}
