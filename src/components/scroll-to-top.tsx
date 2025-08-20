"use client"

import { useState, useEffect } from "react"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center border-2 border-white/20 dark:border-white/10"
      aria-label="العودة للأعلى"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}
