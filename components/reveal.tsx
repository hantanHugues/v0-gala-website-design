"use client"

import React, { type HTMLAttributes, type ReactNode } from "react"
import { useInView } from "@/lib/use-in-view"


type RevealVariant = "fade-up" | "fade-in" | "fade-left" | "fade-right"

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Animation variant. Default "fade-up" */
  variant?: RevealVariant
  /** Delay in ms (for stagger). Default 0 */
  delay?: number
  /** Intersection threshold. Default 0.12 */
  threshold?: number
}

const variantClass: Record<RevealVariant, string> = {
  "fade-up": "reveal-fade-up",
  "fade-in": "reveal-fade-in",
  "fade-left": "reveal-fade-left",
  "fade-right": "reveal-fade-right",
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  threshold = 0.12,
  className = "",
  style,
  ...props
}: RevealProps) {
  const { ref, inView } = useInView({ threshold, once: true })

  return (
    <div
      suppressHydrationWarning
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${variantClass[variant]} ${inView ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

