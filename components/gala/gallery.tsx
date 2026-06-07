"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Reveal } from "@/components/reveal"

type Photo = {
  src: string
  alt: string
  edition: string
  /** desktop grid span classes */
  span: string
}

const photos: Photo[] = [
  {
    src: "/images/gallery-1.png",
    alt: "Invités applaudissant lors du dîner de gala",
    edition: "Édition 2024",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery-2.png",
    alt: "Cérémonie de remise des prix sur scène",
    edition: "Édition 2023",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-3.png",
    alt: "Invités élégants lors de la soirée",
    edition: "Édition 2023",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-4.png",
    alt: "Tables de banquet dressées avec élégance",
    edition: "Édition 2022",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery-5.png",
    alt: "Orchestre en représentation",
    edition: "Édition 2022",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/gallery-6.png",
    alt: "Photo de groupe des leaders AIESEC",
    edition: "Édition 2021",
    span: "col-span-1 row-span-1",
  },
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
              <span className="absolute left-3 top-3 z-20 font-heading text-[0.55rem] tracking-[0.3em] text-cream/60">
                {String(i + 1).padStart(2, "0")}/{photos.length}
              </span>
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="78vw"
                  className="object-cover transition-transform duration-700 group-active:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                {/* zoom icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-active:opacity-100 transition-opacity">
                  <ZoomIn className="size-8 text-gold drop-shadow-lg" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="block font-heading text-[0.55rem] uppercase tracking-[0.3em] text-gold">
                    {photo.edition}
                  </span>
                  <p className="mt-1 text-xs text-cream/70 line-clamp-1">{photo.alt}</p>
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
  return (
    <div className="mt-12 grid auto-rows-[180px] grid-cols-4 gap-3 lg:auto-rows-[200px] lg:gap-4">
      {photos.map((photo, i) => (
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
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
          />

          {/* Dark overlay — light by default, dark on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top — index */}
          <div className="absolute left-3 top-3 z-10 opacity-0 transition-all duration-400 group-hover:opacity-100">
            <span className="font-heading text-[0.55rem] tracking-[0.3em] text-cream/50">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Center — zoom icon */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
            <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 bg-background/30 backdrop-blur-sm">
              <ZoomIn className="size-4 text-gold" />
            </span>
          </div>

          {/* Bottom — label slides up */}
          <div className="absolute inset-x-0 bottom-0 z-10 translate-y-3 p-4 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <span className="block font-heading text-[0.6rem] uppercase tracking-[0.25em] text-gold">
              {photo.edition}
            </span>
            <p className="mt-1 text-xs text-cream/70 line-clamp-2">{photo.alt}</p>
          </div>

          {/* Gold border on hover */}
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
    <section id="galerie" className="s-gallery relative overflow-hidden py-24 sm:py-32">

      {/* ── Header ──────────────────────────────────────────── */}
      <Reveal variant="fade-up">
        <div className="px-6 text-center">
          <p className="font-script text-4xl text-gold sm:text-5xl">
            Souvenirs d&apos;exception
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-cream sm:text-5xl text-balance">
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
          <p className="mt-6 text-center text-[0.55rem] uppercase tracking-[0.35em] text-cream/25">
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
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-gold/30 text-cream transition-all hover:bg-gold/15 sm:right-6 sm:top-6"
            aria-label="Fermer"
          >
            <X className="size-4" />
          </button>

          {/* Counter */}
          <div className="absolute left-1/2 top-5 -translate-x-1/2 font-heading text-[0.6rem] uppercase tracking-[0.35em] text-cream/40">
            {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-cream transition-all hover:bg-gold/15 sm:left-6"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* Image */}
          <figure
            className="relative mx-16 max-h-[82vh] w-full max-w-4xl sm:mx-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-gold/20 sm:aspect-[3/2]">
              <Image
                src={photos[active].src}
                alt={photos[active].alt}
                fill
                sizes="100vw"
                className="object-cover"
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
            className="absolute right-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-cream transition-all hover:bg-gold/15 sm:right-6"
            aria-label="Photo suivante"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </section>
  )
}
