"use client"

import { useState, useEffect } from "react"


const dhikrMessages = [
  "سُبْحَانَ اللَّهِ",
  "الْحَمْدُ لِلَّهِ",
  "اللَّهُ أَكْبَرُ",
  "لَا إِلَهَ إِلَّا اللَّهُ",
  "أَسْتَغْفِرُ اللَّهَ",
  "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
  "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
  "اللَّهُمَّ اغْفِرْ لِي",
  "رَبِّ اغْفِرْ لِي",
  "اللَّهُمَّ ارْحَمْنِي"
]

export function Loading() {
  const [currentDhikr, setCurrentDhikr] = useState(0)
  const [dots, setDots] = useState("")

  useEffect(() => {
    const dhikrInterval = setInterval(() => {
      setCurrentDhikr((prev) => (prev + 1) % dhikrMessages.length)
    }, 2000)

    const dotsInterval = setInterval(() => {
      setDots((prev) => prev.length >= 3 ? "" : prev + ".")
    }, 500)

    return () => {
      clearInterval(dhikrInterval)
      clearInterval(dotsInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="text-center space-y-8 w-full max-w-md">
        {/* Spinning Circle */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-xl sm:text-2xl">🤲</span>
          </div>
        </div>

        {/* Dhikr Text */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground animate-pulse px-4">
            {dhikrMessages[currentDhikr]}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            يرجى الانتظار{dots}
          </p>
        </div>

        {/* Loading Bar */}
        <div className="w-full max-w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
