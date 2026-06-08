import { AtSign, Globe, Mail } from "lucide-react"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            {/* AIESEC Logo */}
            <div className="flex flex-col items-center">
              {/* Light Mode Logo */}
              <img
                src="/images/Blue-Logo.png"
                alt="AIESEC"
                className="h-8 w-auto object-contain sm:h-10 dark:hidden"
              />
              {/* Dark Mode Logo */}
              <img
                src="/images/image.png"
                alt="AIESEC"
                className="hidden h-8 w-auto object-contain sm:h-10 dark:block"
              />
              <span className="mt-1 font-sans text-sm font-semibold uppercase tracking-[0.2em] text-foreground/80 sm:text-base">in Benin</span>
            </div>

            {/* Separator */}
            <div className="hidden h-12 w-px bg-border sm:block" />

            {/* 20 Ans Logo */}
            <div className="flex items-center justify-center">
              {/* Light Mode Logo */}
              <Image
                src="/images/20 ANS AIB.png"
                alt="20 Ans AIESEC in Benin"
                width={140}
                height={70}
                className="h-12 w-auto object-contain sm:h-14 dark:hidden"
              />
              {/* Dark Mode Logo */}
              <Image
                src="/images/20 ANS AIB 1.png"
                alt="20 Ans AIESEC in Benin"
                width={140}
                height={70}
                className="hidden h-12 w-auto object-contain sm:h-14 dark:block"
              />
            </div>
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-sm text-foreground/55 dark:text-cream/55 text-pretty">
            Gala des 20 ans d&apos;impact — Une célébration du leadership des
            jeunes, du passé à l&apos;avenir.
          </p>

          <div className="mt-8 flex items-center gap-6">
            {[AtSign, Globe, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-foreground/60 dark:text-cream/60 transition-colors hover:text-gold"
                aria-label="Réseau social"
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div className="mt-10 h-px w-full max-w-xs hairline" />

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground/40 dark:text-cream/40">
            Juin 2026 · Cotonou, Bénin
          </p>
          <p className="mt-3 text-xs text-foreground/35 dark:text-cream/35">
            © 2026 AIESEC in Benin. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
