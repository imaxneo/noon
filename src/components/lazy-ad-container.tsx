"use client"

import { useEffect, useRef, useState } from "react"

interface LazyAdContainerProps {
  children: React.ReactNode
  fallbackHeight?: string
  className?: string
}

export function LazyAdContainer({ 
  children, 
  fallbackHeight = "h-16", 
  className = "" 
}: LazyAdContainerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasLoaded, setHasLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true)
            setHasLoaded(true)
            // Disconnect observer after first load
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: "50px", // Load 50px before entering viewport
        threshold: 0.1
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [hasLoaded])

  return (
    <div 
      ref={containerRef}
      className={`${fallbackHeight} ${className}`}
      style={{ 
        minHeight: isVisible ? 'auto' : '64px',
        contain: 'layout style paint'
      }}
    >
      {isVisible ? children : (
        <div className="w-full h-full bg-muted/30 rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
        </div>
      )}
    </div>
  )
}
