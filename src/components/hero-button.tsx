"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getTimeBasedContent, type TimeBasedContent } from "@/lib/time-of-day"

export function HeroButton() {
  const [timeContent, setTimeContent] = useState<TimeBasedContent | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const timer = setTimeout(() => {
      if (typeof window !== "undefined") {
        setTimeContent(getTimeBasedContent())
      }
    }, 200)
    
    return () => clearTimeout(timer)
  }, [])

  if (!mounted || !timeContent) {
    return (
      <div className="space-y-6 w-full">
        <Button 
          size="lg" 
          disabled
          className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl w-full max-w-md"
        >
          <span className="relative z-10 font-bold site-text">
            جاري التحميل...
          </span>
        </Button>
        <p className="text-base sm:text-lg text-muted-foreground text-center max-w-md mx-auto px-4 site-text">
          يتم تحديد الأذكار المناسبة حسب الوقت
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 w-full">
      <Button 
        asChild 
        size="lg" 
        className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl w-full max-w-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 hover:bg-primary/90 relative overflow-visible group"
      >
        <Link href={timeContent.route}>
          {/* Hover halo behind the button (larger and stronger) */}
          <span className="pointer-events-none absolute -inset-3 md:-inset-4 rounded-[22px] opacity-0 group-hover:opacity-100 blur-xl md:blur-2xl transition duration-300 ease-out" aria-hidden>
            <span className="absolute inset-0 rounded-[22px] bg-[radial-gradient(75%_75%_at_50%_50%,rgba(34,197,94,0.45),transparent_70%)]"></span>
            <span className="absolute inset-0 rounded-[22px] ring-1 ring-primary/30"></span>
          </span>

          <span className="relative z-10 font-bold site-text">
            {timeContent.title}
          </span>
        </Link>
      </Button>

      <p className="text-base sm:text-lg text-muted-foreground text-center max-w-md mx-auto px-4 site-text">
        {timeContent.description}
      </p>
    </div>
  )
}
