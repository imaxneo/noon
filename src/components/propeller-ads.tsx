"use client"

import { useEffect } from "react"

interface PropellerAdsProps {
  zoneId: string
  placement: "header" | "inline" | "footer"
  index?: number
}

export function PropellerAds({ zoneId, placement, index = 0 }: PropellerAdsProps) {
  useEffect(() => {
    // Load PropellerAds script
    const script = document.createElement('script')
    script.src = 'https://fpyf8.com/88/tag.min.js'
    script.setAttribute('data-zone', zoneId)
    script.setAttribute('data-cfasync', 'false')
    script.async = true
    
    // Add script to head
    document.head.appendChild(script)
    
    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [zoneId])

  return (
    <div 
      id={`propeller-ad-${placement}-${index}`}
      className="w-full h-16 bg-muted/50 rounded flex items-center justify-center"
    >
      <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
    </div>
  )
}