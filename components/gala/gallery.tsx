"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Reveal } from "@/components/reveal"

export type Photo = {
  src: string
  alt: string
  edition: string
  /** desktop grid span classes */
  span: string
}

export const photos: Photo[] = [
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195381/gala_v2/Gala_ancienne_edition_1.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195398/gala_v2/Gala_ancienne_edition_2.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195409/gala_v2/Gala_ancienne_edition_3.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195411/gala_v2/Gala_ancienne_edition_4.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195412/gala_v2/Gala_ancienne_edition_5.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195413/gala_v2/Gala_ancienne_edition_6.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195415/gala_v2/Gala_ancienne_edition_7.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195417/gala_v2/Gala_ancienne_edition_8.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195418/gala_v2/Gala_ancienne_edition_9.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195383/gala_v2/Gala_ancienne_edition_10.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195385/gala_v2/Gala_ancienne_edition_11.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195386/gala_v2/Gala_ancienne_edition_12.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195388/gala_v2/Gala_ancienne_edition_13.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195389/gala_v2/Gala_ancienne_edition_14.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195391/gala_v2/Gala_ancienne_edition_15.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195393/gala_v2/Gala_ancienne_edition_16.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195394/gala_v2/Gala_ancienne_edition_17.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195396/gala_v2/Gala_ancienne_edition_18.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195397/gala_v2/Gala_ancienne_edition_19.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195399/gala_v2/Gala_ancienne_edition_20.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195400/gala_v2/Gala_ancienne_edition_21.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195401/gala_v2/Gala_ancienne_edition_22.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195402/gala_v2/Gala_ancienne_edition_23.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195403/gala_v2/Gala_ancienne_edition_24.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195405/gala_v2/Gala_ancienne_edition_25.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195406/gala_v2/Gala_ancienne_edition_26.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195407/gala_v2/Gala_ancienne_edition_27.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195408/gala_v2/Gala_ancienne_edition_28.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195419/gala_v2/gala_archive_1.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195432/gala_v2/gala_archive_2.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195436/gala_v2/gala_archive_3.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195437/gala_v2/gala_archive_4.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195438/gala_v2/gala_archive_5.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195439/gala_v2/gala_archive_6.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195440/gala_v2/gala_archive_7.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195441/gala_v2/gala_archive_8.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195442/gala_v2/gala_archive_9.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-2 row-span-2"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195420/gala_v2/gala_archive_10.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195422/gala_v2/gala_archive_11.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-1"
  },
  {
    src: "https://res.cloudinary.com/dqv5nasyj/image/upload/v1781195423/gala_v2/gala_archive_12.jpg",
    alt: "AIESEC in Benin - Gala Archives",
    edition: "Éditions passées",
    span: "col-span-1 row-span-2"
  }
]

/* ── Mobile Carousel ─────────────────────────────────────── */
function MobileCarousel({ onOpen }: { onOpen: (i: number) => void }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
    align: "center",
  })
  const [selected, setSelected] = useState(0)

  // Auto-play
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()))
    autoPlayRef.current = setInterval(() => emblaApi.scrollNext(), 3500)
    const stop = () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
    emblaApi.on("pointerDown", stop)
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current) }
  }, [emblaApi])

  return (
    <div className="relative select-none">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y gap-3 pl-5">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => onOpen(i)}
              className="group relative shrink-0 w-[78vw] overflow-hidden rounded-sm border border-gold/20"
              aria-label={`Agrandir : ${photo.alt}`}
            >
              {/* index counter */}
              <span className="absolute left-3 top-3 z-20 font-heading text-[0.55rem] tracking-[0.3em] text-foreground/60 dark:text-cream/60">
                {String(i + 1).padStart(2, "0")}/{photos.length}
              </span>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="78vw"
                  className="object-cover object-top transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                {/* zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
                  <ZoomIn className="size-8 text-gold drop-shadow-lg" />
                </div>
                <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-active:ring-gold/50" />
              </div>
            </button>
          ))}
          {/* trailing space */}
          <div className="w-5 shrink-0" />
        </div>
      </div>

      {/* Progress bar dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Photo ${i + 1}`}
            className={`h-px rounded-full transition-all duration-400 ${
              i === selected ? "w-10 bg-gold" : "w-3 bg-cream/20"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

/* ── Desktop Editorial Grid ──────────────────────────────── */
function DesktopGrid({ onOpen }: { onOpen: (i: number) => void }) {
  const visiblePhotos = photos.slice(0, 6)

  return (
    <div>
      <div className="mt-12 grid auto-rows-[180px] grid-cols-4 gap-3 lg:auto-rows-[200px] lg:gap-4">
        {visiblePhotos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => onOpen(i)}
            className={`group relative overflow-hidden rounded-sm border border-gold/10 ${photo.span}`}
            aria-label={`Agrandir : ${photo.alt}`}
            suppressHydrationWarning
          >
            {/* Photo */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="40vw"
              className="object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
            />

            {/* Dark overlay — light by default, dark on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Top — index */}
            <div className="absolute left-3 top-3 z-10 opacity-0 transition-all duration-400 group-hover:opacity-100">
              <span className="font-heading text-[0.55rem] tracking-[0.3em] text-foreground/50 dark:text-cream/50">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Center — zoom icon */}
            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
              <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 bg-background/30 backdrop-blur-sm">
                <ZoomIn className="size-4 text-gold" />
              </span>
            </div>

            {/* Gold border on hover */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
          </button>
        ))}
      </div>
      {photos.length > 6 && (
        <div className="mt-12 flex justify-center pb-4">
          <Link
            href="/galerie"
            className="rounded-full border border-gold px-8 py-3 text-xs uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-background"
          >
            Voir plus de photos
          </Link>
        </div>
      )}
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
    <section id="galerie" className="s-gallery relative overflow-hidden py-24 sm:py-32">

      {/* ── Header ──────────────────────────────────────────── */}
      <Reveal variant="fade-up">
        <div className="px-6 text-center">
          <p className="font-script text-4xl text-gold sm:text-5xl">
            Souvenirs d&apos;exception
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground dark:text-cream sm:text-5xl text-balance">
            Galerie des Éditions Passées
          </h2>
          <div className="mx-auto mt-6 h-px w-24 hairline-royal" />
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            Retour en images sur deux décennies de soirées mémorables,
            de rencontres inspirantes et de célébrations de l&apos;excellence.
          </p>
        </div>
      </Reveal>

      {/* ── Mobile carousel ─────────────────────────────────── */}
      <Reveal variant="fade-up" delay={150} threshold={0.05}>
        <div className="mt-10 sm:hidden">
          <MobileCarousel onOpen={setActive} />
        </div>
      </Reveal>

      {/* ── Desktop grid ────────────────────────────────────── */}
      <Reveal variant="fade-up" delay={150} threshold={0.05}>
        <div className="mx-auto hidden max-w-6xl px-6 sm:block">
          <DesktopGrid onOpen={setActive} />
          {/* Scroll hint */}
          <p className="mt-6 text-center text-[0.55rem] uppercase tracking-[0.35em] text-foreground/25 dark:text-cream/25">
            Cliquez sur une photo pour l&apos;agrandir
          </p>
        </div>
      </Reveal>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-background/96 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse de photos"
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:right-6 sm:top-6"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-5 -translate-x-1/2 font-heading text-[0.6rem] uppercase tracking-[0.35em] text-foreground/40 dark:text-cream/40">
            {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:left-6"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Image */}
          <figure
            className="relative mx-16 max-h-[82vh] w-full max-w-4xl sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden rounded-sm border border-gold/20 bg-background/50 sm:h-[75vh]">
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-center gap-4 text-center">
              <span className="h-px w-8 bg-gold/40" />
              <div>
                <span className="font-heading text-[0.6rem] uppercase tracking-[0.25em] text-gold">
                  {photos[active].edition}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">{photos[active].alt}</p>
              </div>
              <span className="h-px w-8 bg-gold/40" />
            </figcaption>

            {/* Dot nav */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(i) }}
                  aria-label={`Photo ${i + 1}`}
                  className={`h-px rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-gold" : "w-3 bg-cream/20"
                  }`}
                />
              ))}
            </div>
          </figure>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:right-6"
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  )
}
