import { AtSign, Globe, Mail } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center text-center">
          <span className="font-heading text-2xl font-bold tracking-[0.2em] text-cream">
            AIESEC
          </span>
          <span className="font-script -mt-1 text-xl text-gold">in Benin</span>

          <p className="mt-6 max-w-md leading-relaxed text-sm text-cream/55 text-pretty">
            Gala des 20 ans d&apos;impact — Une célébration du leadership des
            jeunes, du passé à l&apos;avenir.
          </p>

          <div className="mt-8 flex items-center gap-6">
            {[AtSign, Globe, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-cream/60 transition-colors hover:text-gold"
                aria-label="Réseau social"
              >
                <Icon className="size-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div className="mt-10 h-px w-full max-w-xs hairline" />

          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-cream/40">
            Juin 2026 · Cotonou, Bénin
          </p>
          <p className="mt-3 text-xs text-cream/35">
            © 2026 AIESEC in Benin. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
