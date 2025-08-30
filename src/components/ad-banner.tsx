"use client"

import { useEffect, useState } from "react"
import { AdData, AdBanner as AdBannerType } from "@/lib/ads/types"
import { PropellerAds } from "./propeller-ads"

interface AdBannerProps {
  placement: "header" | "inline" | "footer"
  index?: number
  className?: string
}

export function AdBanner({ placement, index = 0, className = "" }: AdBannerProps) {
  const [ads, setAds] = useState<AdData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import("@/data/ads.json").then((data) => {
      setAds(data.default as AdData)
      setLoading(false)
    })
  }, [])

  if (loading || !ads) {
    return (
      <div className={`bg-muted/30 border border-border/50 rounded-lg p-4 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">إعلان</div>
        <div className="w-full h-16 bg-muted/50 rounded flex items-center justify-center">
          <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
        </div>
      </div>
    )
  }

  const relevantAds = ads.banners.filter((ad: AdBannerType) => ad.placement === placement)
  if (relevantAds.length === 0) return null

  const ad = relevantAds[index % relevantAds.length]

  if (ad.type === "propeller") {
    return (
      <div className={`bg-muted/30 border border-border/50 rounded-lg p-4 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">إعلان</div>
        <PropellerAds 
          zoneId={ad.zone || ad.id} 
          placement={placement} 
          index={index} 
        />
      </div>
    )
  }

  if (ad.type === "image") {
    return (
      <div className={`bg-muted/30 border border-border/50 rounded-lg p-4 ${className}`}>
        <div className="text-xs text-muted-foreground mb-2">إعلان</div>
        <a 
          href={ad.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block"
        >
          <img 
            src={ad.src} 
            alt={ad.alt}
            width={ad.width}
            height={ad.height}
            className="w-full h-auto rounded"
          />
        </a>
      </div>
    )
  }

  return null
}
