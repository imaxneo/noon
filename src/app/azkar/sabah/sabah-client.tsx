"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { DhikrCard, Dhikr } from "@/components/dhikr-card"
import { AdManager } from "@/components/ad-manager"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Loading } from "@/components/loading"

import { CurrentUsersBadge } from "@/components/current-users-badge"

interface SabahPageClientProps {
  dhikrList: Dhikr[]
}

export function SabahPageClient({ dhikrList }: SabahPageClientProps) {
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
      <header className="border-b border-border/40 bg-background sticky top-0 z-50 shadow-lg" role="banner">
        <div className="container flex h-16 items-center justify-between px-4 mx-auto">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button asChild variant="ghost" size="sm">
              <Link href="/" className="flex items-center space-x-2 space-x-reverse" aria-label="العودة إلى الصفحة الرئيسية">
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
      <main className="w-full px-4 py-8" role="main">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            title="أذكار الصباح"
            description="ابدأ يومك بالذكر والدعاء، واستعن بالله في جميع أمورك"
            emoji="🌅"
          />

          {/* Progress Summary */}
          <section className="mb-8 text-center w-full" aria-labelledby="progress-summary">
            <h2 id="progress-summary" className="sr-only">ملخص أذكار الصباح</h2>
            <div className="inline-flex items-center space-x-4 space-x-reverse bg-muted/50 rounded-lg px-4 py-2 max-w-full">
              <span className="text-sm text-muted-foreground">
                {dhikrList.length} ذكر
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                أذكار الصباح المأثورة
              </span>
            </div>
          </section>

          {/* شارة المستخدمين الحاليين */}
          <div className="mb-6 text-center w-full">
            <CurrentUsersBadge />
          </div>

          {/* Dhikr Cards */}
          <section className="grid grid-cols-1 gap-6 w-full" aria-labelledby="dhikr-list">
            <h2 id="dhikr-list" className="sr-only">قائمة أذكار الصباح</h2>
            {dhikrList.map((dhikr, index) => (
              <article key={dhikr.id} className="w-full">
                <DhikrCard dhikr={dhikr} category="sabah" />
                {/* Inline ads every 4 dhikrs */}
                {(index + 1) % 4 === 0 && (
                  <aside className="my-4" aria-label="إعلان">
                    <AdManager placement="inline" index={index} />
                  </aside>
                )}
              </article>
            ))}
          </section>
        </div>
      </main>

      {/* Navigation */}
      <nav className="w-full px-4 py-8" role="navigation" aria-label="التنقل بين صفحات الأذكار">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/azkar/masaa" aria-label="انتقل إلى أذكار المساء">
                🌇 أذكار المساء
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/sleep" aria-label="انتقل إلى أذكار النوم">
                🌙 أذكار النوم
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/ibrahimiya" aria-label="انتقل إلى الصلاة الإبراهيمية">
                🕌 الصلاة الإبراهيمية
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/azkar/istighfar" aria-label="انتقل إلى الاستغفار">
                🙏 الاستغفار
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-8" role="contentinfo">
        <div className="w-full px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
              <p className="text-muted-foreground text-sm sm:text-base">
                اللهم بارك لنا في أذكارنا واجعلها خالصة لوجهك الكريم
              </p>
              <nav className="flex items-center space-x-6 space-x-reverse" role="navigation" aria-label="روابط الموقع">
                <Link href="/about" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                  عن الموقع
                </Link>
                <Link href="/privacy" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                  سياسة الخصوصية
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
