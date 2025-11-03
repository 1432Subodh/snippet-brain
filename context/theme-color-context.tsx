// context/theme-color-context.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { applyTheme } from '@/lib/apply-theme'
import { useTheme } from 'next-themes'

type ThemeColorContextType = {
  color: string
  setColor: (color: string) => void
}

const ThemeColorContext = createContext<ThemeColorContextType | undefined>(
  undefined
)

export function ThemeColorProvider({ children }: { children: React.ReactNode }) {
  const { theme: mode } = useTheme()
  const [color, setColor] = useState<string | null>(null)

  // Load saved color once
  useEffect(() => {
    const saved = localStorage.getItem('theme-color') || 'default'
    setColor(saved)
  }, [])

  // Apply theme whenever mode or color changes
  useEffect(() => {
    if (!color || !mode) return
    applyTheme(color, mode as 'light' | 'dark')
    localStorage.setItem('theme-color', color)
  }, [color, mode])

  if (color === null) {
    // Wait until color is loaded before rendering children
    return null
  }

  return (
    <ThemeColorContext.Provider value={{ color, setColor }}>
      {children}
    </ThemeColorContext.Provider>
  )
}

export function useThemeColor() {
  const context = useContext(ThemeColorContext)
  if (!context) {
    throw new Error('useThemeColor must be used within a ThemeColorProvider')
  }
  return context
}
