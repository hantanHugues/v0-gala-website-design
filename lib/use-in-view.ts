"use client"

import { useEffect, useRef, useState } from "react"

interface UseInViewOptions {
  /** Fraction of element visible to trigger (0–1). Default 0.15 */
  threshold?: number
  /** Root margin. Default "0px" */
  rootMargin?: string
  /** Only trigger once (don't re-animate on scroll-up). Default true */
  once?: boolean
}

export function useInView({
  threshold = 0.15,
  rootMargin = "0px",
  once = true,
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
