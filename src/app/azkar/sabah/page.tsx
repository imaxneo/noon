import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/section-header";
import { DhikrCard, Dhikr } from "@/components/dhikr-card";
import { AdBanner } from "@/components/ad-banner";
import { ScrollToTop } from "@/components/scroll-to-top";
import { StructuredData } from "@/components/structured-data";
import { FAQStructuredData } from "@/components/faq-structured-data";
import sabahData from "../../../../data/azkar/sabah.json";

export const metadata: Metadata = {
  title: "أذكار الصباح | نور - رفيق يومك للذكر",
  description: "أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء مع موقع نور. أذكار صباحية كاملة مع التفسير والفوائد.",
  keywords: ["أذكار الصباح", "أذكار صباحية", "حصن المسلم", "أذكار يومية", "دعاء الصباح", "تسبيح الصباح", "ذكر الصباح"],
  alternates: {
    canonical: "https://www.kintego.site/azkar/sabah",
  },
  openGraph: {
    title: "أذكار الصباح | نور - رفيق يومك للذكر",
    description: "أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء مع موقع نور.",
    url: "https://www.kintego.site/azkar/sabah",
    type: "article",
    locale: "ar_SA",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "أذكار الصباح - نور",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار الصباح | نور - رفيق يومك للذكر",
    description: "أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء مع موقع نور.",
    images: ["/og-image.png"],
  },
};

export default function SabahPage() {
  const dhikrList = sabahData as Dhikr[];

  return (
    <>
      <StructuredData
        type="article"
        title="أذكار الصباح"
        description="أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء"
        url="https://www.kintego.site/azkar/sabah"
        keywords={["أذكار الصباح", "أذكار صباحية", "حصن المسلم", "أذكار يومية"]}
      />
      
      <FAQStructuredData
        title="أذكار الصباح - أسئلة شائعة"
        description="أسئلة شائعة حول أذكار الصباح المأثورة من القرآن والسنة"
        url="https://www.kintego.site/azkar/sabah"
        faqs={[
          {
            question: "ما هي أفضل أوقات قراءة أذكار الصباح؟",
            answer: "أفضل وقت لقراءة أذكار الصباح هو من طلوع الفجر حتى شروق الشمس، ويمكن قراءتها حتى الظهر."
          },
          {
            question: "كم مرة يجب قراءة أذكار الصباح؟",
            answer: "يُفضل قراءة أذكار الصباح مرة واحدة يومياً، مع التركيز على الفهم والتدبر في المعاني."
          },
          {
            question: "هل يمكن قراءة أذكار الصباح في أي مكان؟",
            answer: "نعم، يمكن قراءة أذكار الصباح في أي مكان طاهر، سواء في البيت أو في العمل أو في الطريق."
          },
          {
            question: "ما هي فوائد قراءة أذكار الصباح؟",
            answer: "أذكار الصباح تحفظ المسلم من الشيطان، وتجلب البركة والرزق، وتقوي الصلة بالله تعالى."
          }
        ]}
      />
      
      <div className="min-h-screen bg-background">
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
              title="أذكار الصباح"
              description="ابدأ يومك بالذكر والدعاء، واستعن بالله في جميع أمورك"
              emoji="🌅"
            />
            
            {/* Dhikr Cards */}
            <section className="grid grid-cols-1 gap-6 w-full" aria-labelledby="dhikr-list">
              <h2 id="dhikr-list" className="sr-only">قائمة أذكار الصباح</h2>
              {dhikrList.map((dhikr, index) => (
                <article key={dhikr.id} className="w-full">
                  <DhikrCard dhikr={dhikr} category="sabah" />
                  {/* Inline ads every 4 dhikrs */}
                  {(index + 1) % 4 === 0 && (
                    <aside className="my-4" aria-label="إعلان">
                      <AdBanner placement="inline" index={index} />
                    </aside>
                  )}
                </article>
              ))}
            </section>

            {/* Navigation to other Azkar */}
            <div className="mt-12 p-6 bg-muted/20 rounded-2xl border border-border/30">
              <h3 className="text-xl font-semibold text-center mb-6 site-text">
                أذكار أخرى
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button asChild variant="outline" className="h-12">
                  <Link href="/azkar/masaa">
                    🌇 أذكار المساء
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <Link href="/azkar/sleep">
                    🌙 أذكار النوم
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <Link href="/azkar/ibrahimiya">
                    🕌 الصلاة الإبراهيمية
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12">
                  <Link href="/azkar/istighfar">
                    🙏 الاستغفار
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 py-8 mt-8">
          <div className="w-full px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
                <p className="text-muted-foreground text-sm sm:text-base">
                  اللهم بارك لنا في أذكارنا واجعلها خالصة لوجهك الكريم
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
    </>
  );
}