import { Dhikr } from "@/components/dhikr-card"
import { StructuredData } from "@/components/structured-data"
import { PerformanceMonitor } from "@/components/performance-monitor"
import sabahData from "../../../../data/azkar/sabah.json"
import { SabahPageClient } from "./sabah-client"

export const metadata = {
  title: "أذكار الصباح - الأذكار والأدعية المأثورة لبداية اليوم",
  description: "أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء مع موقع نور. أذكار مأثورة صحيحة لحفظ المسلم في الصباح.",
  keywords: ["أذكار الصباح", "أدعية الصباح", "ذكر الصباح", "أذكار يومية", "حصن المسلم", "أذكار مأثورة"],
  openGraph: {
    title: "أذكار الصباح - نور",
    description: "أذكار الصباح المأثورة من القرآن والسنة لبداية يوم مبارك",
    url: "https://noor-app.vercel.app/azkar/sabah",
    images: ["/og-image-sabah.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار الصباح - نور",
    description: "أذكار الصباح المأثورة من القرآن والسنة لبداية يوم مبارك",
    images: ["/og-image-sabah.png"],
  },
}

export default function SabahPage() {
  const dhikrList = sabahData as Dhikr[]

  return (
    <>
      <StructuredData
        type="article"
        title="أذكار الصباح - الأذكار والأدعية المأثورة لبداية اليوم"
        description="أذكار الصباح المأثورة من القرآن والسنة - ابدأ يومك بالذكر والدعاء مع موقع نور. أذكار مأثورة صحيحة لحفظ المسلم في الصباح."
        url="https://noor-app.vercel.app/azkar/sabah"
        keywords={["أذكار الصباح", "أدعية الصباح", "ذكر الصباح", "أذكار يومية"]}
      />
      <PerformanceMonitor />
      <SabahPageClient dhikrList={dhikrList} />
    </>
  )
}