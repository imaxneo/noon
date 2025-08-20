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
          className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-lg bg-gradient-to-r from-primary via-primary to-primary/90 w-full max-w-md"
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
        className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl relative overflow-hidden group transition-all duration-500 shadow-lg hover:shadow-xl hover:shadow-primary/20 bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary hero-glow w-full max-w-md"
      >
        <Link href={timeContent.route}>
          <span className="relative z-10 font-bold site-text">
            {timeContent.title}
          </span>
          
          {/* Subtle background effects - original comfortable speed */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/30 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 hero-shine"></div>
          
          {/* Gentle pulse effect */}
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
        </Link>
      </Button>
      
      <p className="text-base sm:text-lg text-muted-foreground animate-fade-in text-center max-w-md mx-auto px-4 site-text">
        {timeContent.description}
      </p>
    </div>
  )
}
