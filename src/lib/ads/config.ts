/**
 * Centralized ad configuration system for Propeller Ads
 */

export interface AdConfig {
  id: string;
  type: 'banner' | 'native' | 'interstitial' | 'push' | 'popunder';
  placement: 'header' | 'sidebar' | 'inline' | 'footer' | 'popup';
  zoneId?: string;
  targeting?: {
    geo?: string[];
    device?: string[];
    os?: string[];
    browser?: string[];
  };
  frequency?: {
    impressionsPerUser?: number;
    hoursBetweenImpressions?: number;
  };
  optimization?: {
    abTest?: boolean;
    autoOptimize?: boolean;
    targetCTR?: number;
  };
  fallback?: string;
}

export interface AdZone {
  id: string;
  name: string;
  type: 'banner' | 'native' | 'interstitial' | 'push' | 'popunder';
  dimensions?: {
    width: number;
    height: number;
  };
  responsive?: boolean;
}

export const AD_ZONES: Record<string, AdZone> = {
  'header-banner': {
    id: 'header-banner',
    name: 'Header Banner',
    type: 'banner',
    dimensions: { width: 728, height: 90 },
    responsive: true
  },
  'sidebar-native': {
    id: 'sidebar-native',
    name: 'Sidebar Native',
    type: 'native',
    responsive: true
  },
  'inline-banner': {
    id: 'inline-banner',
    name: 'Inline Banner',
    type: 'banner',
    dimensions: { width: 300, height: 250 },
    responsive: true
  },
  'footer-banner': {
    id: 'footer-banner',
    name: 'Footer Banner',
    type: 'banner',
    dimensions: { width: 970, height: 90 },
    responsive: true
  },
  'interstitial-mobile': {
    id: 'interstitial-mobile',
    name: 'Mobile Interstitial',
    type: 'interstitial',
    responsive: true
  }
};

export const PROPELLER_ZONE_IDS = {
  header: '165682',
  native: '165683',
  interstitial: '165684',
  push: '165685',
  popunder: '165686'
};

export const AD_CONFIGURATIONS: AdConfig[] = [
  {
    id: 'header-propeller',
    type: 'banner',
    placement: 'header',
    zoneId: PROPELLER_ZONE_IDS.header,
    targeting: {
      geo: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
      device: ['desktop', 'tablet']
    },
    frequency: {
      impressionsPerUser: 3,
      hoursBetweenImpressions: 1
    },
    optimization: {
      abTest: true,
      autoOptimize: true,
      targetCTR: 0.02
    }
  },
  {
    id: 'native-propeller',
    type: 'native',
    placement: 'sidebar',
    zoneId: PROPELLER_ZONE_IDS.native,
    targeting: {
      geo: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM'],
      device: ['mobile', 'tablet']
    },
    optimization: {
      abTest: true,
      autoOptimize: true,
      targetCTR: 0.03
    }
  },
  {
    id: 'interstitial-propeller',
    type: 'interstitial',
    placement: 'popup',
    zoneId: PROPELLER_ZONE_IDS.interstitial,
    targeting: {
      device: ['mobile']
    },
    frequency: {
      impressionsPerUser: 1,
      hoursBetweenImpressions: 24
    }
  }
];

export const getAdConfig = (adId: string): AdConfig | undefined => {
  return AD_CONFIGURATIONS.find(config => config.id === adId);
};

export const getZoneConfig = (zoneId: string): AdZone | undefined => {
  return AD_ZONES[zoneId];
};

export const isAdEnabled = (config: AdConfig): boolean => {
  // Check if ad is enabled based on targeting rules
  if (config.targeting?.geo) {
    // Geo targeting check would go here
  }
  
  if (config.targeting?.device) {
    // Device targeting check would go here
  }
  
  return true;
};

export const getAdFrequencyKey = (adId: string, userId?: string): string => {
  return `ad_frequency_${adId}_${userId || 'anonymous'}`;
};

export const shouldShowAd = (config: AdConfig, userId?: string): boolean => {
  if (!config.frequency) return true;
  
  const key = getAdFrequencyKey(config.id, userId);
  const lastShown = localStorage.getItem(key);
  
  if (!lastShown) return true;
  
  const lastShownTime = parseInt(lastShown);
  const hoursSinceLastShown = (Date.now() - lastShownTime) / (1000 * 60 * 60);
  
  return hoursSinceLastShown >= (config.frequency.hoursBetweenImpressions || 0);
};

export const recordAdImpression = (adId: string, userId?: string): void => {
  const key = getAdFrequencyKey(adId, userId);
  localStorage.setItem(key, Date.now().toString());
};
