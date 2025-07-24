"use client"

import { useTheme } from "next-themes"
import { useEffect } from "react"

export function useScrollbarTheme() {
  const { theme } = useTheme()

  useEffect(() => {
    // Force scrollbar style recalculation
    const forceScrollbarUpdate = () => {
      document.documentElement.style.scrollbarWidth = "none"
      document.documentElement.offsetHeight // Trigger reflow
      document.documentElement.style.scrollbarWidth = "thin"
    }

    // Small delay to ensure theme class is applied
    const timeoutId = setTimeout(forceScrollbarUpdate, 100)

    return () => clearTimeout(timeoutId)
  }, [theme])
}
