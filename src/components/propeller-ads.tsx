"use client"

import { useEffect } from "react"
import { AdBanner } from "@/lib/ads/types"

interface PropellerAdsProps {
  zoneId: string
  placement: "header" | "inline" | "footer"
  index?: number
}

export function PropellerAds({ zoneId, placement, index = 0 }: PropellerAdsProps) {
  useEffect(() => {
    // Load PropellerAds script
    const script = document.createElement("script")
    script.async = true
    script.src = "//propeller-tracking.com/scripts/propeller.js"
    script.setAttribute("data-zone", zoneId)
    
    const container = document.getElementById(`propeller-${zoneId}-${placement}-${index}`)
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
      id={`propeller-${zoneId}-${placement}-${index}`}
      className="w-full h-16 bg-muted/50 rounded flex items-center justify-center"
    >
      <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
    </div>
  )
}
