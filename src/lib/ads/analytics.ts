/**
 * Advanced analytics and tracking system for Propeller Ads
 */

export interface AdEvent {
  id: string;
  type: 'impression' | 'click' | 'conversion' | 'viewability';
  adId: string;
  zoneId?: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  metadata: {
    url: string;
    referrer?: string;
    userAgent: string;
    viewport: {
      width: number;
      height: number;
    };
    geo?: {
      country?: string;
      region?: string;
      city?: string;
    };
    device?: {
      type: 'desktop' | 'mobile' | 'tablet';
      os?: string;
      browser?: string;
    };
    adPosition?: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    viewability?: {
      visible: boolean;
      visibleTime: number;
      percentVisible: number;
    };
    conversionValue?: number;
  };
}

export interface AdMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  viewability: number;
  revenue: number;
  ecpm: number;
}

export interface AnalyticsConfig {
  enableTracking: boolean;
  enableViewability: boolean;
  enableHeatmap: boolean;
  samplingRate: number;
  batchSize: number;
  flushInterval: number;
}

class AdAnalytics {
  private events: AdEvent[] = [];
  private config: AnalyticsConfig;
  private sessionId: string;
  private userId?: string;

  constructor(config: AnalyticsConfig = {
    enableTracking: true,
    enableViewability: true,
    enableHeatmap: false,
    samplingRate: 1.0,
    batchSize: 50,
    flushInterval: 5000
  }) {
    this.config = config;
    this.sessionId = this.generateSessionId();
    this.userId = this.getUserId();
    this.init();
  }

  private init(): void {
    if (typeof window === 'undefined') return;

    // Set up periodic flush
    setInterval(() => this.flush(), this.config.flushInterval);

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.flush();
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getUserId(): string | undefined {
    if (typeof window === 'undefined') return undefined;
    
    let userId = localStorage.getItem('ad_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ad_user_id', userId);
    }
    return userId;
  }

  private getGeoLocation(): Promise<Partial<AdEvent['metadata']['geo']>> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve({});
        return;
      }

      // Try to get location from browser
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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

  private getDeviceInfo(): AdEvent['metadata']['device'] {
    if (typeof window === 'undefined') return undefined;

    const userAgent = navigator.userAgent;
    const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent);
    const isTablet = /Tablet|iPad/.test(userAgent);
    
    let os = 'unknown';
    if (/Windows/.test(userAgent)) os = 'windows';
    else if (/Mac/.test(userAgent)) os = 'macos';
    else if (/Linux/.test(userAgent)) os = 'linux';
    else if (/Android/.test(userAgent)) os = 'android';
    else if (/iPhone|iPad/.test(userAgent)) os = 'ios';

    let browser = 'unknown';
    if (/Chrome/.test(userAgent)) browser = 'chrome';
    else if (/Firefox/.test(userAgent)) browser = 'firefox';
    else if (/Safari/.test(userAgent)) browser = 'safari';
    else if (/Edge/.test(userAgent)) browser = 'edge';

    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      os,
      browser
    };
  }

  private isSampled(): boolean {
    return Math.random() < this.config.samplingRate;
  }

  async trackEvent(
    type: AdEvent['type'],
    adId: string,
    zoneId?: string,
    additionalMetadata: Partial<AdEvent['metadata']> = {}
  ): Promise<void> {
    if (!this.config.enableTracking || !this.isSampled()) return;

    const geo = await this.getGeoLocation();
    
    const event: AdEvent = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      adId,
      zoneId,
      timestamp: Date.now(),
      userId: this.userId,
      sessionId: this.sessionId,
      metadata: {
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        geo,
        device: this.getDeviceInfo(),
        ...additionalMetadata
      }
    };

    this.events.push(event);

    if (this.events.length >= this.config.batchSize) {
      this.flush();
    }
  }

  trackImpression(adId: string, zoneId?: string, position?: AdEvent['metadata']['adPosition']): void {
    this.trackEvent('impression', adId, zoneId, { adPosition: position });
  }

  trackClick(adId: string, zoneId?: string, position?: AdEvent['metadata']['adPosition']): void {
    this.trackEvent('click', adId, zoneId, { adPosition: position });
  }

  trackConversion(adId: string, zoneId?: string, value?: number): void {
    this.trackEvent('conversion', adId, zoneId, { conversionValue: value });
  }

  trackViewability(
    adId: string,
    zoneId?: string,
    visible: boolean = false,
    visibleTime: number = 0,
    percentVisible: number = 0
  ): void {
    if (!this.config.enableViewability) return;

    this.trackEvent('viewability', adId, zoneId, {
      viewability: {
        visible,
        visibleTime,
        percentVisible
      }
    });
  }

  private async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const eventsToSend = [...this.events];
    this.events = [];

    try {
      // Send to analytics endpoint
      await this.sendToAnalytics(eventsToSend);
      
      // Also store locally for immediate access
      this.storeLocally(eventsToSend);
    } catch (error) {
      console.error('Failed to send analytics:', error);
      // Re-add events to queue
      this.events.unshift(...eventsToSend);
    }
  }

  private async sendToAnalytics(events: AdEvent[]): Promise<void> {
    // In production, send to your analytics endpoint
    // For now, we'll use a mock endpoint
    if (typeof window !== 'undefined') {
      // Mock analytics endpoint
      console.log('Sending analytics events:', events);
      
      // Define the gtag function type
      interface GtagFunction {
        (command: string, eventName: string, params?: Record<string, unknown>): void;
      }
      
      // Extend the Window interface
      interface WindowWithGtag extends Window {
        gtag?: GtagFunction;
      }
      
      const windowWithGtag = window as WindowWithGtag;
      
      // Example: Send to Google Analytics 4
      if (windowWithGtag.gtag) {
        events.forEach(event => {
          windowWithGtag.gtag!('event', event.type, {
            ad_id: event.adId,
            zone_id: event.zoneId,
            custom_parameter_1: event.metadata.url,
            custom_parameter_2: event.metadata.device?.type
          });
        });
      }
    }
  }

  private storeLocally(events: AdEvent[]): void {
    if (typeof window === 'undefined') return;

    const key = `ad_analytics_${this.sessionId}`;
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    const updated = [...existing, ...events];
    
    // Keep only last 1000 events
    const trimmed = updated.slice(-1000);
    localStorage.setItem(key, JSON.stringify(trimmed));
  }

  getMetrics(adId?: string): AdMetrics {
    const events = this.getStoredEvents();
    const filtered = adId ? events.filter(e => e.adId === adId) : events;

    const impressions = filtered.filter(e => e.type === 'impression').length;
    const clicks = filtered.filter(e => e.type === 'click').length;
    const conversions = filtered.filter(e => e.type === 'conversion').length;
    const viewabilityEvents = filtered.filter(e => e.type === 'viewability');

    const totalViewability = viewabilityEvents.reduce((sum, e) => {
      return sum + (e.metadata.viewability?.percentVisible || 0);
    }, 0);

    const avgViewability = viewabilityEvents.length > 0 
      ? totalViewability / viewabilityEvents.length 
      : 0;

    return {
      impressions,
      clicks,
      conversions,
      ctr: impressions > 0 ? clicks / impressions : 0,
      viewability: avgViewability,
      revenue: 0, // Would be calculated from conversion values
      ecpm: impressions > 0 ? (0 / impressions) * 1000 : 0
    };
  }

  private getStoredEvents(): AdEvent[] {
    if (typeof window === 'undefined') return [];
    
    const key = `ad_analytics_${this.sessionId}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }

  clear(): void {
    this.events = [];
    if (typeof window !== 'undefined') {
      const key = `ad_analytics_${this.sessionId}`;
      localStorage.removeItem(key);
    }
  }
}

// Export singleton instance
export const adAnalytics = new AdAnalytics();

// Export for manual configuration
export const createAnalytics = (config: AnalyticsConfig) => new AdAnalytics(config);
