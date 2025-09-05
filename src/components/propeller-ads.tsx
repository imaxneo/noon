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

interface OnclickAdProps {
  htmlScript: string
  srcScript: {
    src: string
    zone: string
  }
}

export function OnclickAd({ htmlScript, srcScript }: OnclickAdProps) {
  useEffect(() => {
    let injected = false
    const onFirstClick = () => {
      if (injected) return
      injected = true
      // Ignore htmlScript to avoid syntax errors; rely on external script
      try {
        // Inject external script
        const s = document.createElement('script')
        s.src = srcScript.src
        s.async = true
        s.setAttribute('data-zone', srcScript.zone)
        s.setAttribute('data-cfasync', 'false')
        document.head.appendChild(s)
      } catch {}
      document.removeEventListener('click', onFirstClick, true)
      document.removeEventListener('touchstart', onFirstClick, true)
    }
    document.addEventListener('click', onFirstClick, true)
    document.addEventListener('touchstart', onFirstClick, true)
    return () => {
      document.removeEventListener('click', onFirstClick, true)
      document.removeEventListener('touchstart', onFirstClick, true)
    }
  }, [htmlScript, srcScript])
  return null
}

interface BannerAdProps {
  htmlScript: string
  inlineScript: string
}

export function BannerAd({ htmlScript, inlineScript }: BannerAdProps) {
  useEffect(() => {
    try {
      // Parse domain and zone from inline snippet like: (function(d,z,s,c){...})('stoampaliy.net',9828201,...)
      const match = inlineScript.match(/\('([^']+)'\s*,\s*(\d+)/)
      if (match) {
        const domain = match[1]
        const zone = match[2]
        const s = document.createElement('script')
        s.src = `https://${domain}/400/${zone}`
        s.async = true
        document.body.appendChild(s)
      }
    } catch {}
  }, [htmlScript, inlineScript])
  return null
}

export function triggerOnclickAd(htmlScript: string, srcScript: { src: string; zone: string }) {
  // Skip inline html script to avoid syntax errors
  try {
    const s = document.createElement('script')
    s.src = srcScript.src
    s.async = true
    s.setAttribute('data-zone', srcScript.zone)
    s.setAttribute('data-cfasync', 'false')
    document.head.appendChild(s)
  } catch {}
}

interface InterstitialOnAnyClickProps {
  zone: string
  src: string
}

export function InterstitialOnAnyClick({ zone, src }: InterstitialOnAnyClickProps) {
  useEffect(() => {
    let loaded = false
    const handler = () => {
      if (loaded) return
      loaded = true
      try {
        const s = document.createElement('script')
        s.src = src
        s.dataset.zone = zone
        s.async = true
        document.body.appendChild(s)
      } catch {}
      window.removeEventListener('click', handler, true)
      window.removeEventListener('pointerdown', handler, true)
      window.removeEventListener('touchstart', handler, true)
      window.removeEventListener('keydown', handler, true)
    }
    window.addEventListener('click', handler, true)
    window.addEventListener('pointerdown', handler, true)
    window.addEventListener('touchstart', handler, true)
    window.addEventListener('keydown', handler, true)
    return () => {
      window.removeEventListener('click', handler, true)
      window.removeEventListener('pointerdown', handler, true)
      window.removeEventListener('touchstart', handler, true)
      window.removeEventListener('keydown', handler, true)
    }
  }, [zone, src])
  return null
}