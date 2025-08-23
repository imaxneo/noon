"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface AdBanner {
  id: string
  type: "image" | "propeller" | "propeller-push" | "propeller-popunder"
  src?: string
  href?: string
  alt?: string
  script?: string
  placement: "header" | "inline" | "footer"
  every?: number
  width?: number
  height?: number
}

interface AdData {
  banners: AdBanner[]
}

interface AdBannerProps {
  placement: "header" | "inline" | "footer"
  index?: number
}

// PropellerAd Component
function PropellerAd({ ad }: { ad: AdBanner }) {
  useEffect(() => {
    if (ad.script) {
      // Create a new script element
      const script = document.createElement('script')
      script.src = "https://fpyf8.com/88/tag.min.js"
      script.setAttribute('data-zone', '165682')
      script.async = true
      script.setAttribute('data-cfasync', 'false')
      
      // Append to document head
      document.head.appendChild(script)
      
      // Cleanup
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      }
    }
  }, [ad.script])

  return (
    <div className="w-full flex justify-center my-6 px-4">
      <div className="bg-muted/30 border border-border/50 rounded-lg p-3 max-w-xs w-full">
        <div className="text-xs text-muted-foreground mb-2 text-center">
          إعلان
        </div>
        <div 
          id={`propeller-ad-${ad.id}`}
          className="w-full h-16 bg-muted/50 rounded flex items-center justify-center"
        >
          <span className="text-xs text-muted-foreground">جاري تحميل الإعلان...</span>
        </div>
      </div>
    </div>
  )
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

  // Render PropellerAds
  if (ad.type === "propeller" || ad.type === "propeller-push" || ad.type === "propeller-popunder") {
    return <PropellerAd ad={ad} />
  }

  // Render image banner (existing functionality)
  if (ad.type === "image" && ad.src && ad.href) {
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
                alt={ad.alt || "إعلان"}
                width={ad.width || 250}
                height={ad.height || 80}
                className="w-full h-16 object-cover rounded"
                unoptimized
              />
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return null
}
