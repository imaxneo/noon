import Link from "next/link"
import { Brand } from "@/components/brand"
import { Button } from "@/components/ui/button"
import { Home, ArrowRight, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col items-center justify-center px-4">
      {/* Header */}
      <div className="absolute top-8 left-8">
        <Brand />
      </div>
      
      {/* Main Content */}
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <span className="text-6xl">404</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          الصفحة غير موجودة
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
          <br />
          يمكنك العودة للصفحة الرئيسية أو البحث في صفحات الأذكار المتاحة.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
          </Link>
          
          <Link href="/azkar/sabah">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <Search className="w-4 h-4 ml-2" />
              أذكار الصباح
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border/40">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            صفحات سريعة
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link href="/azkar/sabah" className="text-sm text-primary hover:underline">
              أذكار الصباح
            </Link>
            <Link href="/azkar/masaa" className="text-sm text-primary hover:underline">
              أذكار المساء
            </Link>
            <Link href="/azkar/sleep" className="text-sm text-primary hover:underline">
              أذكار النوم
            </Link>
            <Link href="/azkar/ibrahimiya" className="text-sm text-primary hover:underline">
              الصلاة الإبراهيمية
            </Link>
            <Link href="/azkar/istighfar" className="text-sm text-primary hover:underline">
              الاستغفار
            </Link>
            <Link href="/about" className="text-sm text-primary hover:underline">
              عن الموقع
            </Link>
            <Link href="/privacy" className="text-sm text-primary hover:underline">
              الخصوصية
            </Link>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 نور - رفيق يومك للذكر. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  )
}
