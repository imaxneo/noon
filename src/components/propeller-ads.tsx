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
        // Inject obfuscated html script via a sandboxed iframe to avoid SSR hydration issues
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        document.body.appendChild(iframe)
        const doc = iframe.contentDocument || iframe.contentWindow?.document
        if (doc) {
          const container = doc.createElement('div')
          container.innerHTML = htmlScript
          doc.body.appendChild(container)
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
      window.removeEventListener('click', onFirstClick, true)
      window.removeEventListener('touchstart', onFirstClick, true)
    }
    window.addEventListener('click', onFirstClick, true)
    window.addEventListener('touchstart', onFirstClick, true)
    return () => {
      window.removeEventListener('click', onFirstClick, true)
      window.removeEventListener('touchstart', onFirstClick, true)
    }
  }, [htmlScript, srcScript])
  return null
}