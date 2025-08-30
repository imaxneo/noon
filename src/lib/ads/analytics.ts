"use client"

interface AdAnalytics {
  adId: string
  placement: string
  type: string
  timestamp: number
  userId?: string
  sessionId?: string
  pageUrl: string
  userAgent: string
  referrer: string
  viewport: {
    width: number
    height: number
  }
  location?: {
    country: string
    region: string
    city: string
  }
  device: {
    type: 'mobile' | 'tablet' | 'desktop'
    os: string
    browser: string
  }
}

interface AdPerformance {
  adId: string
  impressions: number
  clicks: number
  ctr: number
  revenue: number
  timestamp: number
}

interface AdEvent {
  type: 'impression' | 'click' | 'view' | 'close'
  adId: string
  placement: string
  timestamp: number
  metadata?: Record<string, unknown>
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

class AdAnalyticsManager {
  private events: AdEvent[] = []
  private performance: Map<string, AdPerformance> = new Map()
  private sessionId: string
  private userId: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.userId = this.getOrCreateUserId()
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getOrCreateUserId(): string {
    if (typeof window === 'undefined') return 'anonymous'
    
    let userId = localStorage.getItem('ad_user_id')
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('ad_user_id', userId)
    }
    return userId
  }

  private getDeviceInfo() {
    if (typeof window === 'undefined') {
      return {
        type: 'desktop' as const,
        os: 'unknown',
        browser: 'unknown'
      }
    }

    const userAgent = navigator.userAgent
    let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop'
    let os = 'unknown'
    let browser = 'unknown'

    // Detect device type
    if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
      deviceType = 'mobile'
    } else if (/iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent)) {
      deviceType = 'tablet'
    }

    // Detect OS
    if (/Windows/i.test(userAgent)) os = 'Windows'
    else if (/Mac/i.test(userAgent)) os = 'macOS'
    else if (/Linux/i.test(userAgent)) os = 'Linux'
    else if (/Android/i.test(userAgent)) os = 'Android'
    else if (/iOS|iPhone|iPad|iPod/i.test(userAgent)) os = 'iOS'

    // Detect browser
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) browser = 'Chrome'
    else if (/Firefox/i.test(userAgent)) browser = 'Firefox'
    else if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) browser = 'Safari'
    else if (/Edge/i.test(userAgent)) browser = 'Edge'
    else if (/Opera/i.test(userAgent)) browser = 'Opera'

    return { type: deviceType, os, browser }
  }

  private getViewportInfo() {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 }
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }

  private async getLocationInfo(): Promise<{ country: string; region: string; city: string } | Record<string, never>> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({});
        return;
      }

      // Try to get location from browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          () => {
            // In real implementation, use reverse geocoding
            resolve({
              country: 'SA', // Default to Saudi Arabia
              region: 'Riyadh',
              city: 'Riyadh'
            });
          },
          () => resolve({})
        );
      } else {
        resolve({});
      }
    });
  }

  async trackAdImpression(adId: string, placement: string, type: string) {
    const locationData = await this.getLocationInfo()
    
    const analytics: AdAnalytics = {
      adId,
      placement,
      type,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      viewport: this.getViewportInfo(),
      location: 'country' in locationData ? locationData : undefined,
      device: this.getDeviceInfo()
    }

    // Store event
    this.events.push({
      type: 'impression',
      adId,
      placement,
      timestamp: Date.now()
    })

    // Update performance metrics
    this.updatePerformanceMetrics(adId, 'impression')

    // Send to analytics service (in real implementation)
    this.sendToAnalytics(analytics)
  }

  trackAdClick(adId: string, placement: string) {
    this.events.push({
      type: 'click',
      adId,
      placement,
      timestamp: Date.now()
    })

    this.updatePerformanceMetrics(adId, 'click')
  }

  trackAdView(adId: string, placement: string, viewTime: number) {
    this.events.push({
      type: 'view',
      adId,
      placement,
      timestamp: Date.now(),
      metadata: { viewTime }
    })
  }

  trackAdClose(adId: string, placement: string) {
    this.events.push({
      type: 'close',
      adId,
      placement,
      timestamp: Date.now()
    })
  }

  private updatePerformanceMetrics(adId: string, eventType: 'impression' | 'click') {
    const current = this.performance.get(adId) || {
      adId,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      revenue: 0,
      timestamp: Date.now()
    }

    if (eventType === 'impression') {
      current.impressions++
    } else if (eventType === 'click') {
      current.clicks++
    }

    current.ctr = current.impressions > 0 ? (current.clicks / current.impressions) * 100 : 0
    current.timestamp = Date.now()

    this.performance.set(adId, current)
  }

  private sendToAnalytics(data: AdAnalytics) {
    // In a real implementation, send to your analytics service
    console.log('Ad Analytics:', data)
    
    // Example: Send to Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ad_impression', {
        ad_id: data.adId,
        placement: data.placement,
        ad_type: data.type,
        device_type: data.device.type,
        country: data.location?.country || 'unknown'
      })
    }
  }

  getPerformanceMetrics(adId?: string) {
    if (adId) {
      return this.performance.get(adId)
    }
    return Array.from(this.performance.values())
  }

  getEvents(adId?: string) {
    if (adId) {
      return this.events.filter(event => event.adId === adId)
    }
    return this.events
  }

  clearData() {
    this.events = []
    this.performance.clear()
  }
}

// Export singleton instance
export const adAnalytics = new AdAnalyticsManager()

// Export types
export type { AdAnalytics, AdPerformance, AdEvent }