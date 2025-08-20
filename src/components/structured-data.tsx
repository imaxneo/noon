"use client"

import Script from 'next/script'

interface StructuredDataProps {
  type: 'website' | 'article' | 'organization'
  title: string
  description: string
  url: string
  keywords?: string[]
  image?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
}

export function StructuredData({
  type,
  title,
  description,
  url,
  keywords = [],
  image = '/og-image.png',
  author = 'فريق نور',
  publishedTime,
  modifiedTime
}: StructuredDataProps) {
  const baseData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type === 'website' ? 'WebSite' : type === 'article' ? 'Article' : 'Organization',
    "name": title,
    "description": description,
    "url": url,
    "inLanguage": "ar-SA",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }

  let structuredData = baseData

  if (type === 'website') {
    structuredData = {
      ...baseData,
      "publisher": {
        "@type": "Organization",
        "name": "نور - رفيق يومك للذكر",
        "url": "https://noor-app.vercel.app",
        "logo": {
          "@type": "ImageObject",
          "url": "https://noor-app.vercel.app/logo.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://twitter.com/noor_app",
          "https://facebook.com/noorapp"
        ]
      },
      "mainEntity": {
        "@type": "ItemList",
        "name": "أذكار يومية",
        "description": "أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار",
        "numberOfItems": 5,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "أذكار الصباح",
            "url": "https://noor-app.vercel.app/azkar/sabah"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "أذكار المساء",
            "url": "https://noor-app.vercel.app/azkar/masaa"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "أذكار النوم",
            "url": "https://noor-app.vercel.app/azkar/sleep"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "الصلاة الإبراهيمية",
            "url": "https://noor-app.vercel.app/azkar/ibrahimiya"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "الاستغفار",
            "url": "https://noor-app.vercel.app/azkar/istighfar"
          }
        ]
      }
    }
  } else if (type === 'article') {
    structuredData = {
      ...baseData,
      "headline": title,
      "image": image,
      "author": {
        "@type": "Person",
        "name": author
      },
      "publisher": {
        "@type": "Organization",
        "name": "نور - رفيق يومك للذكر",
        "logo": {
          "@type": "ImageObject",
          "url": "https://noor-app.vercel.app/logo.png"
        }
      },
      "datePublished": publishedTime || new Date().toISOString(),
      "dateModified": modifiedTime || new Date().toISOString(),
      "keywords": keywords.join(', '),
      "articleSection": "أذكار إسلامية",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    }
  } else if (type === 'organization') {
    structuredData = {
      ...baseData,
      "name": "نور - رفيق يومك للذكر",
      "alternateName": "Noor App",
      "description": "موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار",
      "url": "https://noor-app.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://noor-app.vercel.app/logo.png",
        "width": 512,
        "height": 512
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "Arabic"
      },
      "sameAs": [
        "https://twitter.com/noor_app",
        "https://facebook.com/noorapp"
      ],
      "foundingDate": "2024",
      "areaServed": "Worldwide",
      "serviceType": "Islamic Content",
      "category": "Religious"
    }
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
