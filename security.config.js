// ملف الحماية الأمنية للموقع
module.exports = {
  // حماية ضد XSS
  xssProtection: {
    enabled: true,
    mode: 'block',
    reportUri: '/security/report'
  },
  
  // حماية ضد Clickjacking
  frameProtection: {
    enabled: true,
    mode: 'DENY',
    allowFrom: []
  },
  
  // حماية ضد CSRF
  csrfProtection: {
    enabled: true,
    tokenLength: 32,
    expiresIn: '1h'
  },
  
  // حماية ضد التلاعب في البيانات
  dataProtection: {
    enabled: true,
    encryption: true,
    integrity: true,
    validation: true
  },
  
  // حماية ضد التلاعب في الملفات
  fileProtection: {
    enabled: true,
    allowedExtensions: ['.js', '.css', '.html', '.json', '.png', '.jpg', '.svg'],
    maxFileSize: '1MB',
    scanForMalware: true
  },
  
  // حماية ضد التلاعب في الشبكة
  networkProtection: {
    enabled: true,
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 دقيقة
      max: 100 // 100 طلب لكل IP
    },
    blockSuspiciousIPs: true,
    enableDDoSProtection: true
  },
  
  // حماية ضد التلاعب في الجلسات
  sessionProtection: {
    enabled: true,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 ساعة
  },
  
  // حماية ضد التلاعب في الكوكيز
  cookieProtection: {
    enabled: true,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 أيام
  },
  
  // حماية ضد التلاعب في المحتوى
  contentProtection: {
    enabled: true,
    sanitizeHTML: true,
    blockScripts: true,
    blockIframes: true,
    blockObjects: true,
    blockEmbeds: true
  },
  
  // حماية ضد التلاعب في الطلبات
  requestProtection: {
    enabled: true,
    validateHeaders: true,
    validateBody: true,
    blockMaliciousRequests: true,
    enableRequestLogging: true
  },
  
  // حماية ضد التلاعب في الاستجابة
  responseProtection: {
    enabled: true,
    validateResponse: true,
    blockMaliciousResponses: true,
    enableResponseLogging: true
  }
}
