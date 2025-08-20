"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface AdBanner {
  id: string
  type: "image"
  src: string
  href: string
  alt: string
  placement: "header" | "inline" | "footer"
  every?: number
}

interface AdData {
  banners: AdBanner[]
}

interface AdBannerProps {
  placement: "header" | "inline" | "footer"
  index?: number
}

export function AdBanner({ placement, index = 0 }: AdBannerProps) {
  const [ads, setAds] = useState<AdData | null>(null)
  const [shouldShow, setShouldShow] = useState(false)

  useEffect(() => {
    // Load ads data
    import("../../data/ads.json").then((data) => {
      setAds(data.default as AdData)
    })
  }, [])

  useEffect(() => {
    // Check if ads are disabled
    const adsDisabled = localStorage.getItem("noor-ads-disabled") === "true"
    setShouldShow(!adsDisabled)
  }, [])

  if (!ads || !shouldShow) return null

  const relevantAds = ads.banners.filter((ad) => {
    if (ad.placement !== placement) return false
    
    // For inline ads, check if we should show based on index
    if (placement === "inline" && ad.every) {
      return (index + 1) % ad.every === 0
    }
    
    return true
  })

  if (relevantAds.length === 0) return null

  const ad = relevantAds[0] // Show first matching ad

  return (
    <div className="w-full flex justify-center my-6 px-4">
      <div className="relative group max-w-full">
        <Link
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-opacity hover:opacity-80 w-full"
        >
          <div className="bg-muted/30 border border-border/50 rounded-lg p-3 max-w-xs w-full">
            <div className="text-xs text-muted-foreground mb-2 text-center">
              إعلان
            </div>
            <Image
              src={ad.src}
              alt={ad.alt}
              width={250}
              height={80}
              className="w-full h-16 object-cover rounded"
              unoptimized
            />
          </div>
        </Link>
      </div>
    </div>
  )
}
