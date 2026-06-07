"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "#apropos", label: "L'Événement" },
  { href: "#heritage", label: "20 Ans" },
  { href: "#programme", label: "Programme" },
  { href: "#lieu", label: "Le Lieu" },
  { href: "#invitation", label: "Réserver" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        {/* Logo — centered on mobile via absolute trick */}
        <a href="#" className="flex flex-col leading-none md:leading-none">
          <span className="font-heading text-lg font-bold tracking-[0.2em] text-cream">
            AIESEC
          </span>
          <span className="font-script -mt-1 text-base text-gold">in Benin</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#invitation"
          className="hidden border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground md:inline-block"
        >
          Demander une invitation
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 text-cream md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-300",
              open ? "opacity-100 rotate-0" : "opacity-0 rotate-90",
            )}
          >
            <X className="size-5" />
          </span>
          <span
            className={cn(
              "flex items-center justify-center transition-all duration-300",
              open ? "opacity-0 -rotate-90" : "opacity-100 rotate-0",
            )}
          >
            <Menu className="size-5" />
          </span>
        </button>
      </nav>

      {/* Mobile menu — slide down with CSS transition */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="border-t border-border/50 bg-background/95 px-6 py-6 backdrop-blur-md">
          {/* gold ornament */}
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gold/20" />
            <span className="text-[0.55rem] uppercase tracking-[0.4em] text-gold/60">Menu</span>
            <span className="h-px flex-1 bg-gold/20" />
          </div>

          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3 text-sm uppercase tracking-[0.18em] text-cream/80 transition-colors hover:text-gold"
                >
                  {l.label}
                  <span className="h-px w-6 bg-gold/30" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#invitation"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-full items-center justify-center border border-gold py-3 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold/10"
          >
            Demander une invitation
          </a>
        </div>
      </div>
    </header>
  )
}
