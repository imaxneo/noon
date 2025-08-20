export type TimeOfDay = "morning" | "evening" | "night"

export interface TimeBasedContent {
  time: TimeOfDay
  title: string
  description: string
  route: string
  emoji: string
}

export function getTimeOfDay(): TimeOfDay {
  // Default to morning to avoid hydration issues
  if (typeof window === "undefined") {
    return "morning"
  }
  
  const hour = new Date().getHours()
  
  if (hour >= 5 && hour < 12) {
    return "morning"
  } else if (hour >= 12 && hour < 19) {
    return "evening"
  } else {
    return "night"
  }
}

export function getTimeBasedContent(): TimeBasedContent {
  const timeOfDay = getTimeOfDay()
  
  const contentMap: Record<TimeOfDay, TimeBasedContent> = {
    morning: {
      time: "morning",
      title: "أذكار الصباح",
      description: "ابدأ يومك بالذكر والدعاء",
      route: "/azkar/sabah",
      emoji: "🌅"
    },
    evening: {
      time: "evening", 
      title: "أذكار المساء",
      description: "اختتم نهارك بالذكر والحمد",
      route: "/azkar/masaa",
      emoji: "🌇"
    },
    night: {
      time: "night",
      title: "أذكار النوم",
      description: "استعد للنوم بالأذكار المباركة",
      route: "/azkar/sleep",
      emoji: "🌙"
    }
  }
  
  return contentMap[timeOfDay]
}
