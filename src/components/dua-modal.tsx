"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function DuaModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Wait for component to mount to avoid hydration issues
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return
      
      // Show modal every time user visits any page
      const currentCount = parseInt(localStorage.getItem("noor-dua-modal-count") || "0")
      const newCount = currentCount + 1
      localStorage.setItem("noor-dua-modal-count", newCount.toString())
      
      // Show modal after a short delay for better UX
      const showTimer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      
      return () => clearTimeout(showTimer)
    }, 500) // زيادة التأخير أكثر لتجنب Hydration
    
    return () => clearTimeout(timer)
  }, [])

  // Listen for route changes to show modal on every page
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const handleRouteChange = () => {
      // Reset modal state when route changes
      setIsOpen(false)
      
      // Show modal again after a short delay
      const timer = setTimeout(() => {
        const currentCount = parseInt(localStorage.getItem("noor-dua-modal-count") || "0")
        const newCount = currentCount + 1
        localStorage.setItem("noor-dua-modal-count", newCount.toString())
        
        setIsOpen(true)
      }, 500)
      
      return () => clearTimeout(timer)
    }

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', handleRouteChange)
    
    // Listen for pushstate (programmatic navigation)
    const originalPushState = history.pushState
    history.pushState = function(...args) {
      originalPushState.apply(history, args)
      handleRouteChange()
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      history.pushState = originalPushState
    }
  }, [])

  const handleClose = () => {
    try {
      // حماية ضد التلاعب
      if (typeof window === "undefined") return
      
      setIsOpen(false)
      
      // Show encouraging message
      const messages = [
        "أحسنت! دعاءك مستجاب إن شاء الله 🙏",
        "ممتاز! استمر في الدعاء والذكر 🌟",
        "بارك الله فيك! دعاءك في السماء 🕌",
        "أحسنت! الله يسمع دعاءك ويستجيب له ✨",
        "ممتاز! استمر في الخير والبركة 🌺"
      ]
      
      // حماية ضد التلاعب في الرسائل
      if (!Array.isArray(messages) || messages.length === 0) {
        return
      }
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      
      // التحقق من صحة الرسالة
      if (typeof randomMessage !== 'string' || randomMessage.length === 0) {
        return
      }
      
      // Optional: Show toast notification here
    } catch {
      // إغلاق الديالوج في حالة الخطأ
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className="w-[90vw] max-w-lg rounded-2xl shadow-2xl backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/85 border border-primary/20 p-4 sm:p-6 md:p-8 dark:from-primary/15 dark:via-primary/8 dark:to-background/95 dark:border-primary/30"
      >
        <DialogHeader className="text-center space-y-4 sm:space-y-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <span className="text-2xl sm:text-3xl md:text-4xl">🤲</span>
          </div>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-center text-foreground site-text">
            تذكر الدعاء
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base md:text-lg leading-relaxed arabic-text text-foreground max-w-md mx-auto break-words whitespace-normal">
            اللهم اغفر ل <span className="font-bold text-primary text-lg sm:text-xl md:text-xl">عماد الدين</span> ولوالديه وجده وجدته وارحمهما كما ربياه صغيراً
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 sm:mt-6">
          <Button
            onClick={handleClose}
            className="w-24 sm:w-28 md:w-32 text-sm sm:text-base md:text-lg py-4 sm:py-5 md:py-6 rounded-xl hover:scale-105 transition-all duration-500 bg-primary hover:bg-primary/90 site-text animate-pulse hover:animate-none"
            size="lg"
          >
            آمين
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
