"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 85
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Generate WebP src with fallback
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  const fallbackSrc = src

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
        />
      )}
      
      <picture>
        {/* WebP source for modern browsers */}
        <source
          srcSet={webpSrc}
          type="image/webp"
          sizes={sizes}
        />
        
        {/* Fallback for older browsers */}
        <Image
          src={fallbackSrc}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          sizes={sizes}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      
      {hasError && (
        <div 
          className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground"
          style={{ width, height }}
        >
          <span className="text-sm">خطأ في تحميل الصورة</span>
        </div>
      )}
    </div>
  )
}
