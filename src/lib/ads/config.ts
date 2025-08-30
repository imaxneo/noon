// Ad configuration constants
export const AD_CONFIG = {
  // PropellerAds zones
  PROPELLER_ZONES: {
    HEADER: "165682",
    INLINE: "165682", 
    FOOTER: "165682"
  },
  
  // Fpyf8 zones
  FPYF8_ZONES: {
    HEADER: "165682",
    INLINE: "165682",
    FOOTER: "165682"
  },
  
  // Ad refresh intervals (in milliseconds)
  REFRESH_INTERVALS: {
    HEADER: 30000, // 30 seconds
    INLINE: 60000, // 1 minute
    FOOTER: 120000 // 2 minutes
  },
  
  // Ad dimensions
  AD_DIMENSIONS: {
    HEADER: { width: 728, height: 90 },
    INLINE: { width: 300, height: 250 },
    FOOTER: { width: 728, height: 90 }
  }
} as const

export type AdPlacement = keyof typeof AD_CONFIG.PROPELLER_ZONES
export type AdZone = string