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
        <a href="#" className="flex flex-col leading-none">
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
          className="text-cream md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm uppercase tracking-[0.18em] text-cream/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#invitation"
                onClick={() => setOpen(false)}
                className="inline-block border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-gold"
              >
                Demander une invitation
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
