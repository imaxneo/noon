/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعادة التوجيه الدائمة
  async redirects() {
    return [
      // إعادة توجيه من النطاقات القديمة
      {
        source: '/azkar/morning',
        destination: '/azkar/sabah',
        permanent: true,
      },
      {
        source: '/azkar/evening',
        destination: '/azkar/masaa',
        permanent: true,
      },
      {
        source: '/azkar/night',
        destination: '/azkar/sleep',
        permanent: true,
      },
      {
        source: '/azkar/ibrahim',
        destination: '/azkar/ibrahimiya',
        permanent: true,
      },
      {
        source: '/azkar/forgiveness',
        destination: '/azkar/istighfar',
        permanent: true,
      },
      // إعادة توجيه من المسارات القديمة
      {
        source: '/morning',
        destination: '/azkar/sabah',
        permanent: true,
      },
      {
        source: '/evening',
        destination: '/azkar/masaa',
        permanent: true,
      },
      {
        source: '/sleep',
        destination: '/azkar/sleep',
        permanent: true,
      },
      {
        source: '/ibrahimiya',
        destination: '/azkar/ibrahimiya',
        permanent: true,
      },
      {
        source: '/istighfar',
        destination: '/azkar/istighfar',
        permanent: true,
      },
    ]
  },
  
  // حماية أمنية
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://madurird.com https://fpyf8.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://fpyf8.com; frame-ancestors 'none';"
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ]
      }
    ]
  },
  
  // حماية إضافية
  outputFileTracingRoot: process.cwd(),
  
  // تحسين الصور
  images: {
    domains: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // تحسين الأداء
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // تحسين البناء
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // حماية ضد التلاعب في الملفات
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // حماية العميل
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // حماية ضد التلاعب في البناء
    config.optimization.minimize = true
    config.optimization.minimizer = config.optimization.minimizer || []
    
    return config
  }
}

module.exports = nextConfig