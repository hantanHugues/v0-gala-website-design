"use client"

import { useState, useCallback, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowLeft } from "lucide-react"
import { photos } from "@/components/gala/gallery"

export default function FullGalleryPage() {
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const next = useCallback(
    () => setActive((i) => (i === null ? null : (i + 1) % photos.length)),
    []
  )
  const prev = useCallback(
    () => setActive((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)),
    []
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
    <main className="min-h-screen bg-background pt-24 pb-24">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-12">
        <Link 
          href="/#galerie" 
          className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors mb-8 text-sm uppercase tracking-widest font-bold"
        >
          <ArrowLeft className="size-4" /> Retour
        </Link>
        <h1 className="font-heading text-4xl font-bold text-foreground dark:text-cream sm:text-5xl lg:text-6xl text-balance">
          Toutes les photos
        </h1>
        <div className="mt-6 h-px w-24 hairline-royal" />
      </div>

      {/* ── Desktop Grid (Responsive) ────────────────────────────────────── */}
      <div className="container mx-auto px-6">
        <div className="grid auto-rows-[200px] grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 grid-flow-dense">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              onClick={() => setActive(i)}
              className={`group relative overflow-hidden rounded-sm border border-gold/10 ${photo.span}`}
              aria-label={`Agrandir : ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-top transition-transform duration-700 ease-out will-change-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <span className="flex size-10 items-center justify-center rounded-full border border-gold/50 bg-background/30 backdrop-blur-sm">
                  <ZoomIn className="size-4 text-gold" />
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all duration-500 group-hover:ring-gold/40" />
            </button>
          ))}
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────── */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/96 backdrop-blur-md"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:right-6 sm:top-6"
          >
            <X className="size-4" />
          </button>
          <div className="absolute left-1/2 top-5 -translate-x-1/2 font-heading text-[0.6rem] uppercase tracking-[0.35em] text-foreground/40 dark:text-cream/40">
            {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:left-6"
          >
            <ChevronLeft className="size-5" />
          </button>

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
          </figure>

          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-3 z-10 flex size-10 items-center justify-center rounded-full border border-gold/30 text-foreground dark:text-cream transition-all hover:bg-gold/15 sm:right-6"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}
    </main>
  )
}
