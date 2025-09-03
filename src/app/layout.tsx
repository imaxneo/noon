import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DuaModalWrapper } from "@/components/dua-modal-wrapper";
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kintego.site'),
  title: {
    default: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    template: "%s | نور - رفيق يومك للذكر"
  },
  description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء مع حفظ التقدم محلياً. موقع بسيط وسريع بدون تتبع للخصوصية.",
  keywords: ["أذكار", "ذكر", "دعاء", "صباح", "مساء", "نوم", "إسلامي", "قرآن", "حديث", "صدقة جارية", "الصلاة الإبراهيمية", "استغفار", "تسبيح", "تحميد", "أذكار يومية", "حصن المسلم"],
  authors: [{ name: "فريق نور", url: "https://www.kintego.site" }],
  creator: "فريق نور",
  publisher: "نور - رفيق يومك للذكر",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.kintego.site',
    languages: {
      'ar': 'https://www.kintego.site',
      'ar-SA': 'https://www.kintego.site',
      'ar-EG': 'https://www.kintego.site',
      'ar-AE': 'https://www.kintego.site',
      'ar-JO': 'https://www.kintego.site',
      'ar-LB': 'https://www.kintego.site',
      'ar-SY': 'https://www.kintego.site',
      'ar-IQ': 'https://www.kintego.site',
      'ar-KW': 'https://www.kintego.site',
      'ar-QA': 'https://www.kintego.site',
      'ar-BH': 'https://www.kintego.site',
      'ar-OM': 'https://www.kintego.site',
      'ar-YE': 'https://www.kintego.site',
      'ar-MA': 'https://www.kintego.site',
      'ar-TN': 'https://www.kintego.site',
      'ar-DZ': 'https://www.kintego.site',
      'ar-LY': 'https://www.kintego.site',
      'ar-SD': 'https://www.kintego.site',
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://www.kintego.site",
    title: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء.",
    siteName: "نور - رفيق يومك للذكر",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "نور - رفيق يومك للذكر - أذكار الصباح والمساء والنوم",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم",
    description: "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء.",
    images: ["/og-image.png"],
    creator: "@noor_app",
    site: "@noor_app",
  },

  other: {
    "application-name": "نور",
    "apple-mobile-web-app-title": "نور",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
    "theme-color": "#16a34a",
    "msapplication-TileColor": "#16a34a",
    "msapplication-config": "/browserconfig.xml",
  },
  // إصلاح مشكلة apple-touch-icon
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Google Fonts - Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Performance Hints */}
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />
        <link rel="preload" href="/favicon-32x32.svg" as="image" type="image/svg+xml" />
        
        {/* Favicons and Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="192x192" href="/icons/icon-192x192.svg" />
        <link rel="icon" type="image/svg+xml" sizes="512x512" href="/icons/icon-512x512.svg" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Microsoft Tiles */}
        <meta name="msapplication-TileColor" content="#16a34a" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#16a34a" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        

        <link rel="canonical" href="https://www.kintego.site" />
      </head>
      <body className={`${cairo.variable} font-sans antialiased`}>
        <Script
          id="madurird-ad-script"
          src="https://madurird.com/tag.min.js"
          data-zone="9761841"
          data-cfasync="false"
          async
        />
        
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID || 'G-XXXXXXXXXX'}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          tabIndex={1}
        >
          انتقل إلى المحتوى الرئيسي
        </a>
        
        <ThemeProvider>
          <DuaModalWrapper />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
        </ThemeProvider>
        <Analytics />
        {/* Screen reader announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="announcements"></div>
      </body>
    </html>
  );
}