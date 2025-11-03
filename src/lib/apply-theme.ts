// lib/apply-theme.ts
export function applyTheme(themeName: string, mode: 'light' | 'dark') {
  if (typeof window === 'undefined') return

  const themes = require('@/lib/themes').themes
  const theme = themes[themeName]?.[mode]
  if (!theme) return

  const root = document.documentElement
  for (const key in theme) {
    root.style.setProperty(key, theme[key])
  }
}
