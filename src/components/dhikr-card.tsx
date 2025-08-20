"use client"


import { Copy, RotateCcw, Plus, Minus, Share2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TapCircle } from "./tap-circle"
import { useLocalCounter, resetSpecificCounter } from "@/lib/storage"
import { cn } from "@/lib/utils"

export interface Dhikr {
  id: string
  text: string
  repeat: number
  source: string
  note?: string
}

interface DhikrCardProps {
  dhikr: Dhikr
  category: string
  className?: string
}

export function DhikrCard({ dhikr, category, className }: DhikrCardProps) {
  const storageKey = `azkar:${category}:${dhikr.id}`
  const { count, target, isCompleted, increment, setTarget, isLoaded } = 
    useLocalCounter(storageKey, dhikr.repeat)
  


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(dhikr.text)
      // Could add a toast notification here
    } catch (error) {
      console.warn("Failed to copy text:", error)
    }
  }

  const handleShare = async () => {
    try {
      // Get current page URL
      const currentUrl = window.location.href
      
      // Try to use Web Share API first (for mobile devices)
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await navigator.share({
          title: "ذكر من موقع نور",
          text: dhikr.text,
          url: currentUrl,
        })
      } else {
        // Fallback: Show URL in alert for copying
        alert(`رابط الصفحة: ${currentUrl}\n\nيمكنك نسخ هذا الرابط يدوياً`)
      }
    } catch (error) {
      // If everything fails, show URL in alert
      try {
        const currentUrl = window.location.href
        alert(`رابط الصفحة: ${currentUrl}`)
      } catch {
        console.warn("Error sharing:", error)
      }
    }
  }

  const adjustTarget = (delta: number) => {
    setTarget(target + delta)
  }

  const handleResetToOriginal = () => {
    // إعادة تعيين العداد إلى القيمة الأصلية
    resetSpecificCounter(storageKey, dhikr.repeat)
    
    // إعادة تحميل الصفحة لتطبيق التغييرات
    window.location.reload()
  }

  if (!isLoaded) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-24 bg-muted rounded"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn(
      "rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-border/40 bg-gradient-to-br from-white/90 via-white/95 to-white/98 backdrop-blur-sm dark:from-background/80 dark:via-background/90 dark:to-card/70 dark:border-border/80 w-full",
      isCompleted && "ring-2 ring-primary/40 bg-gradient-to-br from-primary/10 via-primary/15 to-primary/20 shadow-primary/20 dark:from-primary/8 dark:via-primary/12 dark:to-primary/16 border-2 border-primary/50",
      className
    )}>
      <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 w-full">
        {/* Dhikr Text */}
        <div className="text-center mb-4 sm:mb-6 w-full">
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed arabic-text text-foreground font-medium px-2 break-words whitespace-normal">
            {dhikr.text}
          </p>
        </div>

        {/* Source and Note */}
        <div className="text-center space-y-2 mb-4 sm:mb-6 w-full">
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground break-words whitespace-normal">
            المصدر: {dhikr.source}
          </p>
          {dhikr.note && (
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground/80 break-words whitespace-normal">
              {dhikr.note}
            </p>
          )}
        </div>

        {/* Counter */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <TapCircle 
            target={target}
            count={count}
            onTap={increment}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 space-x-reverse text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
            aria-label={`نسخ الذكر: ${dhikr.text}`}
          >
            <Copy className="h-3 w-3 transition-transform duration-300 group-hover:rotate-12" />
            <span>نسخ</span>
          </Button>
          
          <Button
            onClick={handleResetToOriginal}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 space-x-reverse text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 transition-transform duration-300 group-hover:-rotate-180" />
            <span>إعادة ضبط كاملة</span>
          </Button>
          
          <Button
            onClick={handleShare}
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 space-x-reverse text-xs hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer"
          >
            <Share2 className="h-3 w-3 transition-transform duration-300 group-hover:scale-125" />
            <span>مشاركة</span>
          </Button>
        </div>

        {/* Target Adjustment */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="flex items-center justify-center space-x-4 space-x-reverse">
            <Button
              onClick={() => adjustTarget(-1)}
              variant="ghost"
              size="sm"
              className="w-8 h-8 sm:w-10 sm:h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              disabled={target <= 1}
            >
              <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            <span className="text-sm sm:text-base md:text-lg font-medium text-foreground site-text">
              الهدف: {target}
            </span>
            
            <Button
              onClick={() => adjustTarget(1)}
              variant="ghost"
              size="sm"
              className="w-8 h-8 sm:w-10 sm:h-10 p-0 hover:bg-primary/10 hover:text-primary transition-all duration-300"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground">
            اضغط على الأزرار لتعديل عدد مرات التكرار
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
