"use client"

import { useEffect } from "react"
import { resetAllCounters } from "@/lib/storage"

export function DailyReset() {
  useEffect(() => {
    try {
      const lastReset = localStorage.getItem("noor-last-reset-date") || ""
      const today = new Date().toDateString()
      if (lastReset !== today) {
        resetAllCounters()
        localStorage.setItem("noor-last-reset-date", today)
      }
    } catch {}
  }, [])

  return null
}


