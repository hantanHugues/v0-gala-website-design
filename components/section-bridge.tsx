"use client"

import { useEffect, useState } from "react"

interface SectionBridgeProps {
  /** Couleurs dark mode */
  from: string
  to: string
  /** Couleurs light mode */
  lightFrom: string
  lightTo: string
  height?: number
}

export function SectionBridge({
  from,
  to,
  lightFrom,
  lightTo,
  height = 80,
}: SectionBridgeProps) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Lit l'état initial depuis la classe html (définie par le script inline)
    const update = () =>
      setIsDark(document.documentElement.classList.contains("dark"))

    update()

    // Réagit aux changements de classe (bascule OS en temps réel)
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${isDark ? from : lightFrom} 0%, ${isDark ? to : lightTo} 100%)`,
        position: "relative",
        zIndex: 5,
        pointerEvents: "none",
        marginBottom: "-1px",
      }}
    />
  )
}
