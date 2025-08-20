"use client"

import Link from "next/link"
import { Brand } from "@/components/brand"
import dynamic from "next/dynamic"

const HeroButton = dynamic(() => import("@/components/hero-button").then(mod => ({ default: mod.HeroButton })), {
  ssr: false,
  loading: () => (
    <div className="space-y-6 w-full">
      <div className="text-base sm:text-lg px-8 sm:px-12 py-5 sm:py-7 rounded-2xl bg-gradient-to-r from-primary via-primary to-primary/90 w-full max-w-md flex items-center justify-center">
        <span className="relative z-10 font-bold site-text">جاري التحميل...</span>
      </div>
      <p className="text-base sm:text-lg text-muted-foreground text-center max-w-md mx-auto px-4 site-text">
        يتم تحديد الأذكار المناسبة حسب الوقت
      </p>
    </div>
  )
})
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdBanner } from "@/components/ad-banner"
const CurrentUsersBadge = dynamic(() => import("@/components/current-users-badge").then(mod => ({ default: mod.CurrentUsersBadge })), {
  ssr: false,
  loading: () => (
    <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 px-3 py-2 rounded-full shadow-sm">
      <div className="relative">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>
      <span className="text-sm font-medium text-foreground site-text">جاري التحميل...</span>
    </div>
  )
})
import { StructuredData } from "@/components/structured-data"
import { 
  BookOpen, 
  Shield, 
  Zap,
  Sunrise,
  Moon,
  Bed,
  Heart,
  Star
} from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
const ThemeToggle = dynamic(() => import("@/components/theme-toggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10 rounded-md bg-muted animate-pulse"></div>
})

export default function HomePage() {
  return (
    <>
      <StructuredData
        type="website"
        title="نور - رفيق يومك للذكر | أذكار الصباح والمساء والنوم"
        description="موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. صدقة جارية لتسهيل الذكر والدعاء مع حفظ التقدم محلياً."
        url="https://noor-app.vercel.app"
        keywords={["أذكار", "ذكر", "دعاء", "صباح", "مساء", "نوم", "إسلامي", "قرآن", "حديث", "صدقة جارية", "الصلاة الإبراهيمية", "استغفار", "تسبيح", "تحميد", "أذكار يومية", "حصن المسلم"]}
      />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="w-full px-4 py-4 border-b border-border/40 bg-background sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Brand />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/azkar/sabah" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 site-text whitespace-nowrap relative group"
            >
              أذكار الصباح
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link 
              href="/azkar/masaa" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 site-text whitespace-nowrap relative group"
            >
              أذكار المساء
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link 
              href="/azkar/sleep" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 site-text whitespace-nowrap relative group"
            >
              أذكار النوم
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link 
              href="/azkar/ibrahimiya" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 site-text whitespace-nowrap relative group"
            >
              الصلاة الإبراهيمية
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </Link>
            <Link 
              href="/azkar/istighfar" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 site-text whitespace-nowrap relative group"
            >
              الاستغفار
              <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 pb-4">
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/azkar/sabah" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors site-text px-3 py-2 rounded-lg hover:bg-muted"
            >
              أذكار الصباح
            </Link>
            <Link 
              href="/azkar/masaa" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors site-text px-3 py-2 rounded-lg hover:bg-muted"
            >
              أذكار المساء
            </Link>
            <Link 
              href="/azkar/sleep" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors site-text px-3 py-2 rounded-lg hover:bg-muted"
            >
              أذكار النوم
            </Link>
            <Link 
              href="/azkar/ibrahimiya" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors site-text px-3 py-2 rounded-lg hover:bg-muted"
            >
              الصلاة الإبراهيمية
            </Link>
            <Link 
              href="/azkar/istighfar" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors site-text px-3 py-2 rounded-lg hover:bg-muted"
            >
              الاستغفار
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 py-20 sm:py-24 md:py-32">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground site-text leading-tight tracking-tight text-center">
              نور - رفيق يومك للذكر
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground site-text max-w-4xl mx-auto leading-relaxed font-medium text-center">
              موقع نور للأذكار اليومية - أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار. 
              صدقة جارية لتسهيل الذكر والدعاء مع حفظ التقدم محلياً.
            </p>
            
            {/* Current Users Badge - moved here */}
            <div className="pt-6 text-center">
              <CurrentUsersBadge />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <HeroButton />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full px-4 sm:px-6 py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            title="مميزات موقع نور"
            description="موقع بسيط وسريع يركز على الأذكار دون تشتيت"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
            <Card className="rounded-3xl border border-border/30 bg-background/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3">
              <CardContent className="p-10 text-center space-y-8">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
                  <Zap className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground site-text">بساطة وسرعة</h3>
                <p className="text-lg text-muted-foreground site-text leading-relaxed">
                  تصميم بسيط وخفيف يركز على الأذكار دون تشتيت
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/30 bg-background/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3">
              <CardContent className="p-10 text-center space-y-8">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
                  <Shield className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground site-text">يحفظ تقدمك</h3>
                <p className="text-lg text-muted-foreground site-text leading-relaxed">
                  يحفظ عدد الأذكار التي قرأتها محلياً على جهازك
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/30 bg-background/90 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-3">
              <CardContent className="p-10 text-center space-y-8">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground site-text">بدون تتبع</h3>
                <p className="text-lg text-muted-foreground site-text leading-relaxed">
                  لا نجمع أو نتتبع أي بيانات شخصية أو معلومات عنك
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="w-full px-4 sm:px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            title="أذكار اليوم"
            description="اختر نوع الأذكار حسب الوقت المناسب لك"
          />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
            <Button asChild variant="outline" className="h-16 text-base hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300 site-text font-medium rounded-2xl">
              <Link href="/azkar/sabah">
                <Sunrise className="w-6 h-6 ml-3" />
                أذكار الصباح
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-16 text-base hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300 site-text font-medium rounded-2xl">
              <Link href="/azkar/masaa">
                <Moon className="w-6 h-6 ml-3" />
                أذكار المساء
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-16 text-base hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300 site-text font-medium rounded-2xl">
              <Link href="/azkar/sleep">
                <Bed className="w-6 h-6 ml-3" />
                أذكار النوم
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-16 text-base hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300 site-text font-medium rounded-2xl">
              <Link href="/azkar/ibrahimiya">
                <Heart className="w-6 h-6 ml-3" />
                الصلاة الإبراهيمية
              </Link>
            </Button>
            
            {/* Fifth button centered below */}
            <div className="col-span-2 lg:col-span-4 flex justify-center mt-8">
              <Button asChild variant="outline" className="h-16 text-base hover:bg-primary/10 hover:border-primary/60 hover:text-primary transition-all duration-300 site-text font-medium px-10 rounded-2xl">
                <Link href="/azkar/istighfar">
                  <Star className="w-6 h-6 ml-3" />
                  الاستغفار
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner */}
      <AdBanner placement="footer" />

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 py-16 border-t border-border/30 bg-muted/20">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-base">
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors site-text font-medium">
              عن الموقع
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors site-text font-medium">
              الخصوصية
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors site-text font-medium">
              تواصل معنا
            </Link>
          </div>
        </div>
      </footer>
      
      {/* Quick Dhikr and Scroll to Top Button */}
      <div className="fixed bottom-6 sm:bottom-8 right-4 sm:right-6 z-50">
        <ScrollToTop />
      </div>
    </div>
    </>
  )
}
