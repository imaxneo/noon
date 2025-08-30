export const ANALYTICS_CONFIG = {
  googleAnalytics: {
    trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX',
  },
  // Add other analytics configurations here
} as const;
