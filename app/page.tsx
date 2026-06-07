import { SiteNav } from "@/components/gala/site-nav"
import { Hero } from "@/components/gala/hero"
import { About } from "@/components/gala/about"
import { Heritage } from "@/components/gala/heritage"
import { Gallery } from "@/components/gala/gallery"
import { Program } from "@/components/gala/program"
import { Venue } from "@/components/gala/venue"
import { Invitation } from "@/components/gala/invitation"
import { SiteFooter } from "@/components/gala/site-footer"

export default function Page() {
  return (
    <main className="bg-background">
      <SiteNav />
      <Hero />
      <About />
      <Heritage />
      <Gallery />
      <Program />
      <Venue />
      <Invitation />
      <SiteFooter />
    </main>
  )
}
