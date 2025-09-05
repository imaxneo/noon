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
      try {
        // Execute embedded html script
        const container = document.createElement('div')
        container.innerHTML = htmlScript
        const embedded = container.querySelector('script')
        if (embedded) {
          const s1 = document.createElement('script')
          for (const attr of Array.from(embedded.attributes)) {
            s1.setAttribute(attr.name, attr.value)
          }
          s1.type = 'text/javascript'
          s1.text = embedded.textContent || ''
          document.body.appendChild(s1)
        }
      } catch {}
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
      const container = document.createElement('div')
      container.innerHTML = htmlScript
      const embedded = container.querySelector('script')
      if (embedded) {
        const s1 = document.createElement('script')
        for (const attr of Array.from(embedded.attributes)) {
          s1.setAttribute(attr.name, attr.value)
        }
        s1.type = 'text/javascript'
        s1.text = embedded.textContent || ''
        document.body.appendChild(s1)
        setTimeout(() => {
          try {
            const s2 = document.createElement('script')
            s2.type = 'text/javascript'
            s2.text = inlineScript
            document.body.appendChild(s2)
          } catch {}
        }, 100)
      }
    } catch {}
  }, [htmlScript, inlineScript])
  return null
}