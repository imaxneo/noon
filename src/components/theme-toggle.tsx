"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-9 h-9 sm:w-10 sm:h-10">
        <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    if (resolvedTheme === "light") {
      setTheme("dark")
    } else {
      setTheme("light")
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="w-9 h-9 sm:w-10 sm:h-10 transition-all duration-200 hover:scale-105"
      aria-label="تبديل الثيم"
    >
      {resolvedTheme === "light" ? (
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200" />
      ) : (
        <Sun className="h-4 w-4 sm:h-5 sm:w-5 transition-all duration-200" />
      )}
    </Button>
  )
}
