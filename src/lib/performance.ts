// Performance monitoring utilities
import { Metric } from 'web-vitals'

export function reportWebVitals(metric: Metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      })
    }
  }
}

// LCP optimization
export function optimizeLCP() {
  if (typeof window === 'undefined') return

  // Preload critical resources
  const criticalResources = [
    '/og-image.png',
    '/favicon-32x32.svg',
  ]

  criticalResources.forEach(resource => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = resource.endsWith('.png') ? 'image' : 'image'
    document.head.appendChild(link)
  })

  // Optimize font loading
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.href = 'https://fonts.gstatic.com/s/cairo/v28/SLXgc1nY6HkvalIvTp2mxdt0.woff2'
  fontLink.as = 'font'
  fontLink.type = 'font/woff2'
  fontLink.crossOrigin = 'anonymous'
  document.head.appendChild(fontLink)
}

// CLS prevention
export function preventCLS() {
  if (typeof window === 'undefined') return

  // Reserve space for ads
  const adContainers = document.querySelectorAll('[data-ad-container]')
  adContainers.forEach(container => {
    const element = container as HTMLElement
    element.style.minHeight = '64px'
    element.style.contain = 'layout style paint'
  })

  // Reserve space for images
  const images = document.querySelectorAll('img[data-src]')
  images.forEach(img => {
    const element = img as HTMLImageElement
    if (!element.style.aspectRatio && element.width && element.height) {
      element.style.aspectRatio = `${element.width} / ${element.height}`
    }
  })
}

// TBT optimization
export function optimizeTBT() {
  if (typeof window === 'undefined') return

  // Defer non-critical scripts
  const nonCriticalScripts = document.querySelectorAll('script[data-defer]')
  nonCriticalScripts.forEach(script => {
    const element = script as HTMLScriptElement
    element.defer = true
  })

  // Use requestIdleCallback for non-critical tasks
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      // Load non-critical resources
      const lazyImages = document.querySelectorAll('img[data-src]')
      lazyImages.forEach(img => {
        const element = img as HTMLImageElement
        element.src = element.dataset.src || ''
        element.removeAttribute('data-src')
      })
    })
  }
}

// Initialize performance optimizations
export function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return

  // Run optimizations after page load
  if (document.readyState === 'complete') {
    optimizeLCP()
    preventCLS()
    optimizeTBT()
  } else {
    window.addEventListener('load', () => {
      optimizeLCP()
      preventCLS()
      optimizeTBT()
    })
  }
}

// Performance budget monitoring
export function checkPerformanceBudget() {
  if (typeof window === 'undefined') return

  const budget = {
    LCP: 2500, // 2.5 seconds
    FID: 100,  // 100ms
    CLS: 0.1,  // 0.1
    TBT: 300,  // 300ms
  }

  // Monitor performance entries
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry as PerformanceEntry & { startTime: number }
          if (lcp.startTime > budget.LCP) {
            console.warn(`LCP exceeded budget: ${lcp.startTime}ms > ${budget.LCP}ms`)
          }
        }
      })
    })

    observer.observe({ entryTypes: ['largest-contentful-paint'] })
  }
}
