"use client"

import { useEffect, useState } from "react"

const TARGET = new Date("2026-06-20T19:00:00")

function getRemaining() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    jours: Math.floor(diff / 86400000),
    heures: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    secondes: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const [time, setTime] = useState(getRemaining())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(getRemaining()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: "Jours", value: time.jours },
    { label: "Heures", value: time.heures },
    { label: "Minutes", value: time.minutes },
    { label: "Secondes", value: time.secondes },
  ]

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center">
            <span className="font-heading text-3xl font-bold tabular-nums text-gold sm:text-5xl">
              {mounted ? String(u.value).padStart(2, "0") : "00"}
            </span>
            <span className="mt-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[oklch(0.32_0.12_258)] dark:text-cream/60 sm:text-xs">
              {u.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="-mt-5 font-heading text-2xl text-gold/40 sm:text-4xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
