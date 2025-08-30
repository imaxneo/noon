"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AdData } from "@/lib/ads/types"
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
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="w-full h-16 bg-muted/50 rounded flex items-center justify-center">
        <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
      </div>
    )
  }

  if (!ads || !ads.banners || ads.banners.length === 0) {
    return null
  }

  const ad = ads.banners[index % ads.banners.length]

  if (!ad || ad.placement !== placement) {
    return null
  }

  switch (ad.type) {
    case "propeller":
      return <PropellerAds zoneId={ad.zone || ""} placement={placement} index={index} />
    case "image":
      return (
        <div className={`w-full ${className}`}>
          <a
            href={ad.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Image 
              src={ad.src} 
              alt={ad.alt}
              width={ad.width}
              height={ad.height}
              className="w-full h-auto rounded"
            />
          </a>
        </div>
      )
    case "html":
      return (
        <div 
          dangerouslySetInnerHTML={{ __html: ad.script || "" }} 
          className={`w-full ${className}`}
        />
      )
    default:
      return null
  }
}