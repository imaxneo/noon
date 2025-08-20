"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"

export function CurrentUsersBadge() {
  const [currentUsers, setCurrentUsers] = useState(0)
  const [mounted, setMounted] = useState(false)

  // تحديث عدد المستخدمين حسب الوقت
  useEffect(() => {
    setMounted(true)
    
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return
      
      const updateUserCount = () => {
        const now = new Date()
        const hour = now.getHours()
        
        // عدد مستخدمين متغير حسب الوقت
        if (hour >= 5 && hour < 12) {
          // الصباح: كثير من المستخدمين
          const baseUsers = 150
          const randomVariation = Math.floor(Math.random() * 50) + 20
          setCurrentUsers(baseUsers + randomVariation)
        } else if (hour >= 12 && hour < 18) {
          // الظهر: عدد متوسط
          const baseUsers = 80
          const randomVariation = Math.floor(Math.random() * 40) + 15
          setCurrentUsers(baseUsers + randomVariation)
        } else if (hour >= 18 && hour < 22) {
          // المساء: عدد قليل
          const baseUsers = 45
          const randomVariation = Math.floor(Math.random() * 30) + 10
          setCurrentUsers(baseUsers + randomVariation)
        } else {
          // الليل: عدد قليل جداً لكن محفز
          const baseUsers = 25
          const randomVariation = Math.floor(Math.random() * 20) + 5
          setCurrentUsers(baseUsers + randomVariation)
        }
      }

      // تحديث فوري
      updateUserCount()
      
      // تحديث كل 5 دقائق
      const interval = setInterval(updateUserCount, 5 * 60 * 1000)
      
      return () => clearInterval(interval)
    }, 300) // تأخير لتجنب hydration mismatch
    
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return (
      <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group">
        <div className="relative">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <Users className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary site-text whitespace-nowrap">
          جاري التحميل...
        </span>
      </div>
    )
  }

  return (
    <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 px-3 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group">
      {/* نقطة البث المباشر */}
      <div className="relative">
        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
      </div>
      
      {/* أيقونة المستخدمين */}
      <Users className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
      
      {/* عدد المستخدمين */}
      <span className="text-sm font-medium text-primary site-text whitespace-nowrap">
        {currentUsers} مستخدم حالياً
      </span>
    </div>
  )
}
