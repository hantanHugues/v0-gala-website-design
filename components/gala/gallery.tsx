"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Photo = {
  src: string
  alt: string
  edition: string
  className: string
}

const photos: Photo[] = [
  {
    src: "/images/gallery-1.png",
    alt: "Invités applaudissant lors du dîner de gala",
    edition: "Édition 2024",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Cérémonie de remise des prix sur scène",
    edition: "Édition 2023",
    className: "",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Invités élégants échangeant lors de la soirée",
    edition: "Édition 2023",
    className: "",
  },
  {
    src: "/images/gallery-5.png",
    alt: "Orchestre de jazz en représentation",
    edition: "Édition 2022",
    className: "sm:col-span-2",
  },
  {
    src: "/images/gallery-4.png",
    alt: "Tables de banquet dressées avec élégance",
    edition: "Édition 2024",
    className: "",
  },
  {
    src: "/images/gallery-6.png",
    alt: "Jeunes leaders réunis pour une photo de groupe",
    edition: "Édition 2022",
    className: "",
  },
]

/* ── Mobile Carousel ─────────────────────────────────────── */
function MobileCarousel({ onOpen }: { onOpen: (i: number) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false })
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()))
  }, [emblaApi])

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {photos.map((photo, i) => (
            <div
              key={photo.src}
              className="relative min-w-[82vw] shrink-0 pr-3 first:pl-6 last:pr-6"
            >
              <button
                onClick={() => onOpen(i)}
                className="group relative block w-full overflow-hidden rounded-sm border border-gold/20"
                aria-label={`Agrandir : ${photo.alt}`}
              >
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="82vw"
                    className="object-cover transition-transform duration-700 group-active:scale-105"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
                  {/* edition label */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <span className="block font-heading text-[0.6rem] uppercase tracking-[0.3em] text-gold">
                      {photo.edition}
                    </span>
                    <p className="mt-1 text-xs text-cream/70 line-clamp-1">{photo.alt}</p>
                  </div>
                  {/* gold ring on hover */}
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-active:ring-gold/40" />
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Photo ${i + 1}`}
            className={`h-px transition-all duration-300 ${
              i === selected
                ? "w-8 bg-gold"
                : "w-4 bg-cream/25"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Desktop Grid ────────────────────────────────────────── */
function DesktopGrid({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="mt-16 grid auto-rows-[200px] grid-cols-4 gap-4">
      {photos.map((photo, i) => (
        <button
          key={photo.src}
          onClick={() => onOpen(i)}
          className={`group relative overflow-hidden rounded-sm border border-gold/15 ${photo.className}`}
          aria-label={`Agrandir : ${photo.alt}`}
        >
          <Image
            src={photo.src || "/placeholder.svg"}
            alt={photo.alt}
            fill
            sizes="25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">
              {photo.edition}
            </span>
          </div>
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
        </button>
      ))}
    </div>
  )
}

/* ── Main Export ─────────────────────────────────────────── */
export function Gallery() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % photos.length)),
    [],
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [active, close, next, prev])

  return (
    <section id="galerie" className="relative bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <Reveal variant="fade-up">
          <div className="px-6 text-center">
            <p className="font-script text-2xl text-gold sm:text-3xl">
              Souvenirs d&apos;exception
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
              Galerie des Éditions Passées
            </h2>
            <div className="mx-auto mt-6 h-px w-24 hairline-royal" />
            <p className="mx-auto mt-6 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Retour en images sur deux décennies de soirées mémorables,
              de rencontres inspirantes et de célébrations de l&apos;excellence.
            </p>
          </div>
        </Reveal>

        {/* Mobile carousel — visible on < sm */}
        <Reveal variant="fade-up" delay={150} threshold={0.05}>
          <div className="mt-10 sm:hidden">
            <MobileCarousel onOpen={setActive} />
          </div>
        </Reveal>

        {/* Desktop grid — visible on sm+ */}
        <Reveal variant="fade-up" delay={150} threshold={0.05}>
          <div className="hidden px-6 sm:block">
            <DesktopGrid onOpen={setActive} />
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photos"
        >
          <button
            onClick={close}
            className="absolute right-5 top-5 rounded-full border border-gold/30 p-2 text-cream transition-colors hover:bg-gold/10"
            aria-label="Fermer"
          >
            <X className="size-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-4 rounded-full border border-gold/30 p-2 text-cream transition-colors hover:bg-gold/10 sm:left-8"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-6" />
          </button>
          <figure
            className="relative mx-14 sm:mx-16 max-h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-gold/25">
              <Image
                src={photos[active].src || "/placeholder.svg"}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.2em] text-gold">
                {photos[active].edition}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">{photos[active].alt}</p>
            </figcaption>
          </figure>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-4 rounded-full border border-gold/30 p-2 text-cream transition-colors hover:bg-gold/10 sm:right-8"
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}
