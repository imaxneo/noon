"use client"

import Script from 'next/script'

interface FAQStructuredDataProps {
  title: string
  description: string
  url: string
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQStructuredData({
  title,
  description,
  url,
  faqs
}: FAQStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })),
    "name": title,
    "description": description,
    "url": url,
    "inLanguage": "ar-SA",
    "author": {
      "@type": "Organization",
      "name": "نور - رفيق يومك للذكر"
    },
    "publisher": {
      "@type": "Organization",
      "name": "نور - رفيق يومك للذكر",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.kintego.site/logo.png"
      }
    }
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
