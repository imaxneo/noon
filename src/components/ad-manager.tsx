"use client"

import { useEffect, useState } from "react"
import { AdBanner } from "@/lib/ads/types"
import { PropellerAds } from "./propeller-ads"
import { Fpyf8Ads } from "./fpyf8-ads"
import { AdBanner as AdBannerComponent } from "./ad-banner"

interface AdManagerProps {
  placement: "header" | "inline" | "footer"
  index?: number
}

export function AdManager({ placement, index = 0 }: AdManagerProps) {
  const [ads, setAds] = useState<AdBanner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load ads from JSON data
    fetch("/api/ads")
      .then(res => res.json())
      .then(data => {
        const filteredAds = data.banners.filter(
          (banner: AdBanner) => banner.placement === placement
        )
        setAds(filteredAds)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [placement])

  if (loading) {
    return (
      <div className="w-full h-16 bg-muted/50 rounded flex items-center justify-center">
        <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
      </div>
    )
  }

  if (ads.length === 0) {
    return null
  }

  const ad = ads[index % ads.length]

  switch (ad.type) {
    case "propeller":
      return <PropellerAds zoneId={ad.zone || ""} placement={placement} index={index} />
    case "fpyf8":
      return <Fpyf8Ads zoneId={ad.zone || ""} placement={placement} index={index} />
    case "image":
      return <AdBannerComponent placement={placement} index={index} />
    case "html":
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: ad.script || "" }} 
          className="w-full"
        />
      )
    default:
      return null
  }
}