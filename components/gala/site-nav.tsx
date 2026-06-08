"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Menu, X, Sun, Moon, Monitor } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import { TranslationKey } from "@/lib/translations"
import { useTheme } from "next-themes"

export function SiteNav() {
  const { language, setLanguage, t } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links: { href: string; labelKey: TranslationKey }[] = [
    { href: "#apropos", labelKey: "nav.about" },
    { href: "#heritage", labelKey: "nav.heritage" },
    { href: "#programme", labelKey: "nav.program" },
    { href: "#lieu", labelKey: "nav.venue" },
    { href: "#invitation", labelKey: "nav.reservation" },
  ]

  useEffect(() => {
    setMounted(true)
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
        <a href="#" className="flex items-center">
          {/* Light Mode Logo */}
          <Image
            src="/images/20 ANS AIB.png"
            alt="20 Ans AIESEC in Benin"
            width={120}
            height={50}
            className="h-10 w-auto object-contain sm:h-12 dark:hidden"
            priority
          />
          {/* Dark Mode Logo */}
          <Image
            src="/images/20 ANS AIB 1.png"
            alt="20 Ans AIESEC in Benin"
            width={120}
            height={50}
            className="hidden h-10 w-auto object-contain sm:h-12 dark:block"
            priority
          />
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-foreground/70 dark:text-cream/70 transition-colors hover:text-gold"
              >
                {t(l.labelKey)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          {/* Theme Switcher */}
          {mounted && (
            <button
              onClick={() => {
                if (theme === "system") setTheme("dark")
                else if (theme === "dark") setTheme("light")
                else setTheme("system")
              }}
              className="flex size-7 items-center justify-center rounded-full border border-royal/30 bg-background/70 text-foreground/70 backdrop-blur-md transition-colors hover:text-royal dark:border-cream/30 dark:hover:text-gold"
              title="Changer le thème"
              aria-label="Changer le thème"
            >
              {theme === "light" && <Sun className="size-3.5" />}
              {theme === "dark" && <Moon className="size-3.5" />}
              {theme === "system" && <Monitor className="size-3.5" />}
            </button>
          )}

          {/* Language Switcher */}
          <div className="flex items-center rounded-full border border-royal/30 bg-background/70 p-0.5 backdrop-blur-md dark:border-cream/30">
            <button
              onClick={() => setLanguage("fr")}
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.6rem] font-bold transition-colors",
                language === "fr"
                  ? "bg-royal text-white dark:bg-cream dark:text-background"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              FR
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.6rem] font-bold transition-colors",
                language === "en"
                  ? "bg-royal text-white dark:bg-cream dark:text-background"
                  : "text-foreground/50 hover:text-foreground"
              )}
            >
              EN
            </button>
          </div>

          <a
            href="#invitation"
            className="hidden border border-gold px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-gold transition-colors hover:bg-gold hover:text-primary-foreground md:inline-block"
          >
            {t("nav.invite_button")}
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 text-foreground dark:text-cream md:hidden"
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
                  className="flex items-center justify-between py-3 text-sm uppercase tracking-[0.18em] text-foreground/80 dark:text-cream/80 transition-colors hover:text-gold"
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
