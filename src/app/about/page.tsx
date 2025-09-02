import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"

export const metadata: Metadata = {
  title: "عن موقع نور | أذكار الصباح والمساء والنوم",
  description: "تعرف على موقع نور: رسالتنا في تسهيل ذكر الله اليومي مع أذكار الصباح والمساء والنوم، الصلاة الإبراهيمية والاستغفار، دون تتبع وبواجهة سريعة بالعربية.",
  keywords: ["عن موقع نور", "من نحن", "أذكار", "أذكار الصباح", "أذكار المساء", "أذكار النوم", "الصلاة الإبراهيمية", "الاستغفار"],
  alternates: {
    canonical: "https://www.kintego.site/about",
  },
  openGraph: {
    title: "عن موقع نور | أذكار الصباح والمساء والنوم",
    description: "تعرف على موقع نور ورسالتنا ومصادر المحتوى وكيف نحافظ على الخصوصية.",
    url: "https://www.kintego.site/about",
    type: "article",
    locale: "ar_SA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "عن موقع نور",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" style={{ 
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 100%)',
      backdropFilter: 'blur(10px)'
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section className="prose prose-neutral max-w-none mb-6 text-muted-foreground site-text">
          <p>
            &quot;نور&quot; مبادرة تهدف لتسهيل الذكر اليومي باللغة العربية عبر تجربة سريعة وبسيطة على الجوال
            والحاسوب، دون إعلانات مزعجة أو تتبع للخصوصية. نعتمد صيغ الأذكار المأثورة من القرآن والسنة
            ونحرص على الدقة اللغوية وعرض الفوائد بإيجاز.
          </p>
          <p>
            جرّب صفحات الأذكار مباشرة:
            <Link href="/azkar/sabah" className="ml-2 text-primary hover:underline">أذكار الصباح</Link>
            <span className="mx-1">|</span>
            <Link href="/azkar/masaa" className="text-primary hover:underline">أذكار المساء</Link>
            <span className="mx-1">|</span>
            <Link href="/azkar/sleep" className="text-primary hover:underline">أذكار النوم</Link>
            <span className="mx-1">|</span>
            <Link href="/azkar/ibrahimiya" className="text-primary hover:underline">الصلاة الإبراهيمية</Link>
            <span className="mx-1">|</span>
            <Link href="/azkar/istighfar" className="text-primary hover:underline">الاستغفار</Link>
          </p>
        </section>
        <SectionHeader
          title="عن موقع نور"
          description="رفيق يومك للذكر - صدقة جارية نسأل الله أن ينفع بها"
          emoji="📖"
        />

        <div className="space-y-8">
          {/* About Section */}
          <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <span>🎯</span>
                <span>الهدف من الموقع</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
              <p className="arabic-text">
                موقع &ldquo;نور&rdquo; هو مشروع صدقة جارية يهدف إلى تسهيل قراءة الأذكار اليومية على المسلمين. 
                صُمم الموقع ليكون بسيطاً وخفيفاً، يركز على الأذكار دون تشتيت أو تعقيد.
              </p>
              <p className="arabic-text">
                نسأل الله العظيم أن يتقبل هذا العمل وأن يجعله في ميزان حسنات كل من ساهم فيه أو استفاد منه.
              </p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <span>✨</span>
                <span>مميزات الموقع</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 space-x-reverse">
                  <span className="text-primary text-xl">⚡</span>
                  <div>
                    <h4 className="font-semibold">سريع وخفيف</h4>
                    <p className="text-muted-foreground text-sm">تصميم بسيط يحمل بسرعة على جميع الأجهزة</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <span className="text-primary text-xl">💾</span>
                  <div>
                    <h4 className="font-semibold">يحفظ التقدم</h4>
                    <p className="text-muted-foreground text-sm">يحفظ عدد الأذكار التي قرأتها محلياً</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <span className="text-primary text-xl">🔒</span>
                  <div>
                    <h4 className="font-semibold">خصوصية تامة</h4>
                    <p className="text-muted-foreground text-sm">لا نجمع أو نتتبع أي بيانات شخصية</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 space-x-reverse">
                  <span className="text-primary text-xl">🌙</span>
                  <div>
                    <h4 className="font-semibold">وضع داكن</h4>
                    <p className="text-muted-foreground text-sm">يدعم الوضع الداكن لراحة العينين</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sources */}
          <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <span>📚</span>
                <span>المصادر</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="arabic-text mb-4">
                تم جمع الأذكار من المصادر الموثوقة التالية:
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>صحيح البخاري</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>صحيح مسلم</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>سنن أبي داود</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>سنن الترمذي</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>حصن المسلم</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span>الدرر السنية</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Dua */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg arabic-text font-semibold mb-2">
                  🤲 اللهم تقبل منا هذا العمل واجعله خالصاً لوجهك الكريم
                </p>
                <p className="text-muted-foreground">
                  ربنا تقبل منا إنك أنت السميع العليم
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <p className="text-muted-foreground text-sm sm:text-base">
              اللهم بارك لنا في أذكارنا واجعلها خالصة لوجهك الكريم
            </p>
            <div className="flex items-center space-x-6 space-x-reverse">
              <Link href="/" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                الرئيسية
              </Link>
              <Link href="/privacy" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                سياسة الخصوصية
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
