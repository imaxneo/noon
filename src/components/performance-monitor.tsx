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

"use client"

import { useEffect } from 'react'

interface PerformanceMonitorProps {
  enabled?: boolean
}

export function PerformanceMonitor({ enabled = false }: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Simple performance logging
    const logPerformance = () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Performance] Component mounted and ready')
      }
    }

    setTimeout(logPerformance, 100)
  }, [enabled])

  return null
}