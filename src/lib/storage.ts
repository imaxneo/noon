"use client"

import { useEffect, useState, useCallback } from "react"

// حماية ضد التلاعب في البيانات - متغيرات للاستخدام المستقبلي
// const SECURE_KEY_PREFIX = 'noor_secure_'
// const DATA_INTEGRITY_CHECK = 'noor_integrity_'

export interface CounterData {
  count: number
  target: number
  updatedAt: number
  lastResetDate: string // تاريخ آخر إعادة تعيين
}

// دالة للتحقق من سلامة البيانات - للاستخدام المستقبلي
// function verifyDataIntegrity(data: unknown, key: string): boolean {
//   try {
//     if (typeof data !== 'object' || data === null) return false
//     const dataObj = data as Record<string, unknown>
//     if (typeof dataObj.count !== 'number' || typeof dataObj.target !== 'number') return false
//     if (dataObj.count < 0 || dataObj.target < 1) return false
//     if (dataObj.updatedAt && typeof dataObj.updatedAt !== 'number') return false
//     if (!key.startsWith('azkar:')) return false
//     return true
//   } catch (error) {
//     console.warn('Data integrity check failed:', error)
//     return false
//   }
// }

// دوال التشفير - للاستخدام المستقبلي
// function encryptData(data: string): string {
//   try {
//     return btoa(encodeURIComponent(data))
//   } catch (error) {
//     console.warn('Encryption failed:', error)
//     return data
//   }
// }

// function decryptData(encryptedData: string): string {
//   try {
//     return decodeURIComponent(atob(encryptedData))
//   } catch (error) {
//     console.warn('Decryption failed:', error)
//     return encryptedData
//   }
// }

// دالة للتحقق من إذا كان اليوم الجديد
function isNewDay(lastResetDate: string): boolean {
  try {
    const lastDate = new Date(lastResetDate)
    const currentDate = new Date()
    
    // التحقق من صحة التاريخ
    if (isNaN(lastDate.getTime()) || isNaN(currentDate.getTime())) return false
    
    return (
      lastDate.getDate() !== currentDate.getDate() ||
      lastDate.getMonth() !== currentDate.getMonth() ||
      lastDate.getFullYear() !== currentDate.getFullYear()
    )
  } catch (error) {
    console.warn('Date check failed:', error)
    return false
  }
}

// دالة للحصول على تاريخ اليوم الحالي كسلسلة نصية
function getCurrentDateString(): string {
  try {
    return new Date().toDateString()
  } catch (error) {
    console.warn('Date string generation failed:', error)
    return new Date().toISOString()
  }
}

export function useLocalCounter(key: string, defaultTarget: number = 1) {
  const [data, setData] = useState<CounterData>({
    count: 0,
    target: defaultTarget,
    updatedAt: 0,
    lastResetDate: ""
  })
  const [isLoaded, setIsLoaded] = useState(false)
  const [originalTarget, setOriginalTarget] = useState(defaultTarget)

  // Load data from localStorage on mount
  useEffect(() => {
    // Wait for component to mount to avoid hydration issues
    const timer = setTimeout(() => {
      if (typeof window === "undefined") return
      
      try {
        const stored = localStorage.getItem(key)
        if (stored) {
          const parsed = JSON.parse(stored) as CounterData
          
          // حفظ الهدف الأصلي من البيانات المخزنة
          setOriginalTarget(parsed.target)
          
          // التحقق من إذا كان اليوم الجديد
          if (parsed.lastResetDate && isNewDay(parsed.lastResetDate)) {
            // إعادة تعيين العداد تلقائياً
            const newData = {
              ...parsed,
              count: 0,
              target: parsed.target, // الحفاظ على الهدف الحالي
              updatedAt: 0, // لا نستخدم Date.now() لتجنب Hydration
              lastResetDate: "" // لا نستخدم getCurrentDateString() لتجنب Hydration
            }
            setData(newData)
            localStorage.setItem(key, JSON.stringify(newData))
          } else {
            setData(parsed)
          }
        } else {
          // إذا لم تكن هناك بيانات مخزنة، احفظ الهدف الأصلي
          setOriginalTarget(defaultTarget)
          setData({
            count: 0,
            target: defaultTarget,
            updatedAt: 0, // لا نستخدم Date.now() لتجنب Hydration
            lastResetDate: "" // لا نستخدم getCurrentDateString() لتجنب Hydration
          })
        }
      } catch (error) {
        console.warn("Failed to load counter data:", error)
        setOriginalTarget(defaultTarget)
        setData({
          count: 0,
          target: defaultTarget,
          updatedAt: 0, // لا نستخدم Date.now() لتجنب Hydration
          lastResetDate: "" // لا نستخدم getCurrentDateString() لتجنب Hydration
        })
      } finally {
        setIsLoaded(true)
      }
    }, 200) // زيادة التأخير لتجنب Hydration
    
    return () => clearTimeout(timer)
  }, [key, defaultTarget])

  // Save data to localStorage whenever it changes
  const saveData = useCallback((newData: CounterData) => {
    if (typeof window === "undefined") return
    
    try {
      localStorage.setItem(key, JSON.stringify(newData))
      setData(newData)
    } catch (error) {
      console.warn("Failed to save counter data:", error)
    }
  }, [key])

  const increment = useCallback(() => {
    const newData = {
      ...data,
      count: data.count + 1,
      updatedAt: Date.now()
    }
    saveData(newData)
    
    // Haptic feedback on mobile
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      const vibrationEnabled = localStorage.getItem("noor-vibration-enabled") !== "false"
      if (vibrationEnabled) {
        navigator.vibrate(10)
      }
    }
  }, [data, saveData])

  // دالة لإعادة العداد إلى الصفر مع الحفاظ على الهدف الحالي
  const reset = useCallback(() => {
    const newData = {
      ...data,
      count: 0,
      target: originalTarget, // إعادة الهدف إلى القيمة الأصلية
      updatedAt: Date.now(),
      lastResetDate: getCurrentDateString()
    }
    saveData(newData)
  }, [data, saveData, originalTarget])

  // دالة لإعادة الحالة إلى الأصلية بالكامل (العداد + الهدف)
  const resetToOriginal = useCallback(() => {
    const newData = {
      count: 0,
      target: originalTarget, // إعادة الهدف إلى القيمة الأصلية
      updatedAt: Date.now(),
      lastResetDate: getCurrentDateString()
    }
    saveData(newData)
  }, [originalTarget, saveData])

  const setTarget = useCallback((target: number) => {
    const newData = {
      ...data,
      target: Math.max(1, target),
      updatedAt: Date.now()
    }
    saveData(newData)
  }, [data, saveData])

  // التحقق من إذا كان العداد مكتمل
  const isCompleted = data.count >= data.target
  const progress = data.target > 0 ? (data.count / data.target) * 100 : 0

  return {
    count: data.count,
    target: data.target,
    isCompleted,
    progress: Math.min(100, progress),
    increment,
    reset,
    resetToOriginal, // إضافة الدالة الجديدة
    setTarget,
    isLoaded,
    lastResetDate: data.lastResetDate
  }
}

// Utility functions for settings
export function getVibrationEnabled(): boolean {
  if (typeof window === "undefined") return true
  return localStorage.getItem("noor-vibration-enabled") !== "false"
}

export function setVibrationEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return
  localStorage.setItem("noor-vibration-enabled", enabled.toString())
}

export function getSoundEnabled(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("noor-sound-enabled") === "true"
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return
  localStorage.setItem("noor-sound-enabled", enabled.toString())
}

// دالة لإعادة تعيين جميع العدادات تلقائياً
export function resetAllCounters(): void {
  if (typeof window === "undefined") return
  
  try {
    const keys = Object.keys(localStorage)
    const counterKeys = keys.filter(key => key.startsWith('counter-'))
    
    counterKeys.forEach(key => {
      const stored = localStorage.getItem(key)
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as CounterData
          const newData = {
            ...parsed,
            count: 0,
            updatedAt: Date.now(),
            lastResetDate: getCurrentDateString()
          }
          localStorage.setItem(key, JSON.stringify(newData))
        } catch (error) {
          console.warn(`Failed to reset counter ${key}:`, error)
        }
      }
    })
  } catch (error) {
    console.warn("Failed to reset all counters:", error)
  }
}

// دالة لإعادة تعيين عداد محدد إلى القيمة الأصلية
export function resetSpecificCounter(key: string, defaultTarget: number): void {
  if (typeof window === "undefined") return
  
  try {
    // إنشاء بيانات جديدة مع إعادة تعيين كاملة
    const newData = {
      count: 0,
      target: defaultTarget, // إعادة الهدف إلى القيمة الأصلية
      updatedAt: Date.now(),
      lastResetDate: getCurrentDateString()
    }
    
    // حفظ البيانات في localStorage
    localStorage.setItem(key, JSON.stringify(newData))
    
    console.log(`تم إعادة تعيين العداد ${key} إلى القيمة الأصلية:`, newData)
  } catch (error) {
    console.warn(`فشل في إعادة تعيين العداد ${key}:`, error)
  }
}
