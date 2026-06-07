import { SiteNav } from "@/components/gala/site-nav"
import { Hero } from "@/components/gala/hero"
import { About } from "@/components/gala/about"
import { Heritage } from "@/components/gala/heritage"
import { Gallery } from "@/components/gala/gallery"
import { Program } from "@/components/gala/program"
import { Venue } from "@/components/gala/venue"
import { Invitation } from "@/components/gala/invitation"
import { SiteFooter } from "@/components/gala/site-footer"
import { SectionBridge } from "@/components/section-bridge"

/* ── Couleurs de fond par section ────────────────────────────
   Doivent correspondre exactement aux valeurs dans globals.css
──────────────────────────────────────────────────────────── */
/* ── Couleurs de fond — dark mode ─────────────────────────── */
const D = {
  hero:       "oklch(0.10 0.03 265)",
  about:      "oklch(0.16 0.018 78)",
  heritage:   "oklch(0.13 0.02 265)",
  gallery:    "oklch(0.09 0.020 265)",
  program:    "oklch(0.19 0.030 65)",
  venue:      "oklch(0.13 0.02 265)",
  invitation: "oklch(0.12 0.035 262)",
  footer:     "oklch(0.08 0.02 265)",
}

/* ── Couleurs de fond — light mode ────────────────────────── */
const L = {
  hero:       "oklch(0.95 0.008 85)",
  about:      "oklch(0.91 0.010 85)",
  heritage:   "oklch(0.88 0.015 255)",
  gallery:    "oklch(0.93 0.006 85)",
  program:    "oklch(0.89 0.012 255)",
  venue:      "oklch(0.93 0.008 85)",
  invitation: "oklch(0.92 0.008 85)",
  footer:     "oklch(0.88 0.012 85)",
}

export default function Page() {
  return (
    <main className="bg-background">
      <SiteNav />
      <Hero />
      <SectionBridge from={D.hero} to={D.about} lightFrom={L.hero} lightTo={L.about} height={160} />
      <About />
      <SectionBridge from={D.about} to={D.heritage} lightFrom={L.about} lightTo={L.heritage} height={140} />
      <Heritage />
      <SectionBridge from={D.heritage} to={D.gallery} lightFrom={L.heritage} lightTo={L.gallery} height={120} />
      <Gallery />
      <SectionBridge from={D.gallery} to={D.program} lightFrom={L.gallery} lightTo={L.program} height={180} />
      <Program />
      <SectionBridge from={D.program} to={D.venue} lightFrom={L.program} lightTo={L.venue} height={160} />
      <Venue />
      <SectionBridge from={D.venue} to={D.invitation} lightFrom={L.venue} lightTo={L.invitation} height={120} />
      <Invitation />
      <SectionBridge from={D.invitation} to={D.footer} lightFrom={L.invitation} lightTo={L.footer} height={100} />
      <SiteFooter />
    </main>
  )
}
