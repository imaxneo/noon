"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { DhikrCard, Dhikr } from "@/components/dhikr-card"
import { AdBanner } from "@/components/ad-banner"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Loading } from "@/components/loading"

import { CurrentUsersBadge } from "@/components/current-users-badge"
import ibrahimiyaData from "../../../../data/azkar/ibrahimiya.json"

export default function IbrahimiyaPage() {
  const dhikrList = ibrahimiyaData as Dhikr[]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-background" style={{ 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.005) 100%)',
      backdropFilter: 'blur(3px)'
    }}>
      {/* Header */}
      <header className="border-b border-border/40 bg-background sticky top-0 z-50 shadow-lg">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse">
                <ArrowLeft className="h-4 w-4" />
                <span>العودة</span>
              </Link>
            </Button>
            <Brand />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="الصلاة الإبراهيمية"
            description="أفضل الصلوات على النبي محمد ﷺ، صلوا عليه وسلموا تسليماً"
            emoji="🕌"
          />

          {/* Progress Summary */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center space-x-4 space-x-reverse bg-muted/50 rounded-lg px-4 py-2">
              <span className="text-sm text-muted-foreground">
                {dhikrList.length} ذكر
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                الصلاة الإبراهيمية المأثورة
              </span>
            </div>
          </div>

          {/* شارة المستخدمين الحاليين */}
          <div className="mb-6 text-center">
            <CurrentUsersBadge />
          </div>

          {/* Dhikr Cards */}
          <div className="grid grid-cols-1 gap-6">
            {dhikrList.map((dhikr, index) => (
              <div key={dhikr.id}>
                <DhikrCard dhikr={dhikr} category="ibrahimiya" />
                {/* Inline ads every 4 dhikrs */}
                {(index + 1) % 4 === 0 && (
                  <AdBanner placement="inline" index={index} />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation */}
      <div className="w-full px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/azkar/sabah">
                🌅 أذكار الصباح
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/masaa">
                🌇 أذكار المساء
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/sleep">
                🌙 أذكار النوم
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/istighfar">
                🙏 الاستغفار
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-8">
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
              <p className="text-muted-foreground text-sm sm:text-base">
                اللهم صل على محمد وعلى آل محمد كما صليت على إبراهيم وعلى آل إبراهيم
              </p>
              <div className="flex items-center space-x-6 space-x-reverse">
                <Link href="/about" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                  عن الموقع
                </Link>
                <Link href="/privacy" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                  سياسة الخصوصية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
