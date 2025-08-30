"use client"

import { useEffect } from "react"

interface Fpyf8AdsProps {
  zoneId: string
  placement: "header" | "inline" | "footer"
  index?: number
}

export function Fpyf8Ads({ zoneId, placement, index = 0 }: Fpyf8AdsProps) {
  useEffect(() => {
    // Load Fpyf8 script
    const script = document.createElement("script")
    script.async = true
    script.src = "https://fpyf8.com/88/tag.min.js"
    script.setAttribute("data-zone", zoneId)
    script.setAttribute("data-cfasync", "false")
    
    const container = document.getElementById(`fpyf8-${zoneId}-${placement}-${index}`)
    if (container) {
      container.appendChild(script)
    }

    return () => {
      if (container && script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [zoneId, placement, index])

  return (
    <div 
      id={`fpyf8-${zoneId}-${placement}-${index}`}
      className="w-full h-16 bg-muted/50 rounded flex items-center justify-center"
    >
      <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
    </div>
  )
}
