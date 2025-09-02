import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Brand } from "@/components/brand"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"

export const metadata: Metadata = {
  title: "سياسة الخصوصية | نور",
  description: "سياسة الخصوصية لموقع نور: ما نجمعه، وكيف نستخدمه، وأدوات الطرف الثالث، وكيف نحافظ على خصوصيتك.",
  keywords: ["سياسة الخصوصية", "الخصوصية", "Cookies", "تحليلات"],
  alternates: {
    canonical: "https://www.kintego.site/privacy",
  },
  openGraph: {
    title: "سياسة الخصوصية | نور",
    description: "اطّلع على سياسة الخصوصية وكيف نحمي بياناتك.",
    url: "https://www.kintego.site/privacy",
    type: "article",
    locale: "ar_SA",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "سياسة الخصوصية" }],
  },
}

export default function PrivacyPage() {
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
            نحرص في &quot;نور&quot; على حماية خصوصيتك. نجمع أقل قدر من البيانات اللازمة لتحسين الأداء
            وتجربة الاستخدام، دون جمع بيانات تعريفية شخصية.
          </p>
          <h3>ما الذي نجمعه؟</h3>
          <ul>
            <li>بيانات استخدام عامة (الصفحات، الوقت، نوع الجهاز) بشكل مجمل.</li>
            <li>ملفات ضرورية لعمل الموقع (مثل تفضيلات الواجهة).</li>
          </ul>
          <h3>كيف نستخدم البيانات؟</h3>
          <ul>
            <li>تحسين الأداء وتجربة المستخدم.</li>
            <li>تحليلات مجمّعة لفهم التفاعل مع المحتوى.</li>
          </ul>
          <h3>التواصل</h3>
          <p>
            للاستفسارات، تواصل عبر صفحة
            <Link href="/about" className="ml-1 text-primary hover:underline">عن الموقع</Link>.
          </p>
        </section>
        <SectionHeader
          title="سياسة الخصوصية"
          description="نلتزم بحماية خصوصيتك وعدم جمع أي بيانات شخصية"
          emoji="🔒"
        />

        <div className="space-y-6">
          {/* Main Privacy Statement */}
                     <Card className="border-green-200 bg-green-50/90 backdrop-blur-sm dark:border-green-800 dark:bg-green-900/20 border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">
                  لا نجمع أي بيانات شخصية
                </h2>
                <p className="text-lg arabic-text text-green-700 dark:text-green-300">
                  موقع &ldquo;نور&rdquo; لا يقوم بجمع أو تخزين أو تتبع أي بيانات شخصية أو معلومات عنك مطلقاً
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Local Storage */}
                     <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
             <CardHeader>
               <CardTitle className="flex items-center space-x-2 space-x-reverse">
                 <span>💾</span>
                 <span>التخزين المحلي</span>
               </CardTitle>
             </CardHeader>
            <CardContent className="space-y-4">
              <p className="arabic-text">
                يستخدم الموقع التخزين المحلي (LocalStorage) في متصفحك فقط لحفظ:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>عدد المرات التي قرأت فيها كل ذكر</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>الهدف الذي حددته لكل ذكر</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>تفضيلاتك للثيم (فاتح أو داكن)</span>
                </li>
                <li className="flex items-start space-x-2 space-x-reverse">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span>إعدادات الاهتزاز والصوت</span>
                </li>
              </ul>
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>ملاحظة:</strong> هذه البيانات تُحفظ محلياً على جهازك فقط ولا تُرسل إلى أي خادم أو جهة خارجية.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* No Analytics */}
                     <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
             <CardHeader>
               <CardTitle className="flex items-center space-x-2 space-x-reverse">
                 <span>📊</span>
                 <span>لا تحليلات أو تتبع</span>
               </CardTitle>
             </CardHeader>
            <CardContent>
              <p className="arabic-text mb-4">
                الموقع لا يستخدم:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-red-500">❌</span>
                  <span>Google Analytics أو أي خدمة تحليلات</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-red-500">❌</span>
                  <span>ملفات تعريف الارتباط (Cookies)</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-red-500">❌</span>
                  <span>أدوات تتبع المستخدمين</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-red-500">❌</span>
                  <span>جمع عناوين IP أو معلومات الجهاز</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Ads */}
                     <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
             <CardHeader>
               <CardTitle className="flex items-center space-x-2 space-x-reverse">
                 <span>📢</span>
                 <span>الإعلانات</span>
               </CardTitle>
             </CardHeader>
            <CardContent>
              <p className="arabic-text">
                الإعلانات المعروضة في الموقع هي إعلانات ثابتة وبسيطة لا تتتبع سلوكك أو تجمع معلومات عنك.
                يمكنك إخفاؤها من الإعدادات إذا رغبت في ذلك.
              </p>
            </CardContent>
          </Card>

          {/* Data Control */}
                     <Card className="bg-white/95 backdrop-blur-sm dark:bg-card border-0 shadow-lg">
             <CardHeader>
               <CardTitle className="flex items-center space-x-2 space-x-reverse">
                 <span>🛠️</span>
                 <span>التحكم في بياناتك</span>
               </CardTitle>
             </CardHeader>
            <CardContent>
              <p className="arabic-text mb-4">
                يمكنك في أي وقت:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-green-500">✅</span>
                  <span>حذف جميع البيانات المحفوظة محلياً من إعدادات المتصفح</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-green-500">✅</span>
                  <span>إعادة ضبط عدادات الأذكار</span>
                </li>
                <li className="flex items-center space-x-2 space-x-reverse">
                  <span className="text-green-500">✅</span>
                  <span>استخدام الموقع دون حفظ أي بيانات</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">
                  أسئلة أو استفسارات؟
                </h3>
                <p className="text-muted-foreground">
                  إذا كان لديك أي استفسار حول سياسة الخصوصية، يسعدنا التواصل معك
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
              <Link href="/about" className="text-sm hover:text-primary transition-all duration-200 px-3 py-2 rounded-lg hover:bg-primary/10">
                عن الموقع
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
