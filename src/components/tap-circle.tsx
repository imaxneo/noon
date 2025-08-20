"use client"

import { useState, useCallback } from "react"
import { Check } from "lucide-react"

interface TapCircleProps {
  target: number
  count: number
  onTap: () => void
  className?: string
}

export function TapCircle({ target, count, onTap, className = "" }: TapCircleProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [showEncouragement, setShowEncouragement] = useState(false)
  const [encouragementText, setEncouragementText] = useState("")
  
  // Calculate progress percentage
  const progress = Math.min((count / target) * 100, 100)

  const handleTap = useCallback(() => {
    if (count >= target || isAnimating) return

    setIsAnimating(true)
    onTap()

    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // رسائل تشجيع متنوعة ومناسبة لكل مستوى
    const newCount = count + 1
    
    // رسائل للمستويات المبكرة
    if (newCount === 1) {
      showEncouragementMessage("أحسنت! بداية ممتازة! 🌟")
    } else if (newCount === 2) {
      showEncouragementMessage("ممتاز! استمر في الخير! ✨")
    } else if (newCount === 3) {
      showEncouragementMessage("أحسنت! أنت متقدم! 🚀")
    } else if (newCount === 5) {
      showEncouragementMessage("أحسنت! خمسة من خمسة! 🎯")
    } else if (newCount === 7) {
      showEncouragementMessage("ممتاز! سبعة من سبعة! 💪")
    } else if (newCount === 10) {
      showEncouragementMessage("أحسنت! عشرة من عشرة! 🌟")
    }
    // رسائل للمستويات المتوسطة
    else if (newCount === Math.ceil(target * 0.25)) {
      const messages = [
        "أحسنت! ربع الطريق! 🌟",
        "ممتاز! ربع الطريق! ✨",
        "أحسنت! ربع الطريق! 🎯"
      ]
      showEncouragementMessage(messages[Math.floor(Math.random() * messages.length)])
    } else if (newCount === Math.ceil(target * 0.5)) {
      const messages = [
        "أحسنت! نصف الطريق! 🎯",
        "ممتاز! نصف الطريق! 🚀",
        "أحسنت! نصف الطريق! 💪"
      ]
      showEncouragementMessage(messages[Math.floor(Math.random() * messages.length)])
    } else if (newCount === Math.ceil(target * 0.75)) {
      const messages = [
        "أحسنت! ثلاثة أرباع الطريق! 🚀",
        "ممتاز! ثلاثة أرباع الطريق! 🌟",
        "أحسنت! ثلاثة أرباع الطريق! 🎯"
      ]
      showEncouragementMessage(messages[Math.floor(Math.random() * messages.length)])
    }
    // رسائل للمستويات المتقدمة
    else if (newCount === target - 2) {
      showEncouragementMessage("أحسنت! باقي اثنان! 🎉")
    } else if (newCount === target - 1) {
      showEncouragementMessage("أحسنت! آخر مرة! 🎊")
    } else if (newCount === target) {
      showEncouragementMessage("أحسنت! أتممت الذكر! 🎉✨")
    }
    // رسائل عشوائية للمستويات الأخرى
    else if (newCount % 3 === 0 && newCount < target * 0.8) {
      const randomMessages = [
        "استمر! أنت ممتاز! ✨",
        "أحسنت! استمر في الخير! 🌟",
        "ممتاز! أنت متقدم! 🚀",
        "أحسنت! استمر! 💪",
        "ممتاز! أنت رائع! 🎯"
      ]
      showEncouragementMessage(randomMessages[Math.floor(Math.random() * randomMessages.length)])
    }

    setTimeout(() => setIsAnimating(false), 300)
  }, [count, target, onTap, isAnimating])

  const showEncouragementMessage = (message: string) => {
    setEncouragementText(message)
    setShowEncouragement(true)
    setTimeout(() => setShowEncouragement(false), 3000)
  }

  const isCompleted = count >= target

  return (
    <div className={`relative flex flex-col items-center space-y-4 w-full ${className}`}>
      {/* رسائل التقدم - في مكان مناسب ومريح للعين */}
      {showEncouragement && (
        <div 
          className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-3 rounded-xl shadow-2xl animate-bounce z-20 max-w-xs text-center border-2 border-white/20"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          id="encouragement-message"
        >
          <span className="text-sm font-bold whitespace-nowrap overflow-hidden text-ellipsis block">{encouragementText}</span>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
        </div>
      )}

      {/* Main Circle - التصميم الأصلي مع خلفية خضراء متوسطة */}
      <div className="relative flex justify-center w-full">
        {/* Progress Ring */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 relative">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="4"
              className="opacity-30"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          
          {/* Center Content - خلفية خضراء متوسطة مع عدد التكرارات أو علامة الصح */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-gradient-to-br from-primary to-primary/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 select-none ${
                isAnimating ? 'animate-pulse' : ''
              }`}
              onClick={handleTap}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTap()
                }
              }}
              aria-label={`اضغط لزيادة العداد - ${count} من ${target}`}
              aria-describedby={showEncouragement ? "encouragement-message" : undefined}
            >
              {isCompleted ? (
                <Check className="w-8 h-10 sm:w-10 sm:h-12 md:w-12 md:h-14 text-white select-none" />
              ) : (
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-white site-text select-none">
                  {count} / {target}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
