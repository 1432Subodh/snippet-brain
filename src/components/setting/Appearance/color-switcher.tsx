"use client"

import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useThemeColor } from "../../../../context/theme-color-context"
import { Moon, SunMedium, Palette, Sparkles, Monitor } from "lucide-react"

const availableThemeColors = [
  { name: "default", label: "Default", light: "bg-zinc-100", dark: "bg-zinc-800", gradient: "from-zinc-400 to-zinc-600" },
  { name: "red", label: "Red", light: "bg-red-500", dark: "bg-red-600", gradient: "from-red-400 to-rose-600" },
  { name: "rose", label: "Rose", light: "bg-rose-500", dark: "bg-rose-600", gradient: "from-pink-400 to-rose-600" },
  { name: "blue", label: "Blue", light: "bg-blue-500", dark: "bg-blue-600", gradient: "from-blue-400 to-indigo-600" },
  { name: "orange", label: "Orange", light: "bg-orange-500", dark: "bg-orange-600", gradient: "from-orange-400 to-red-600" },
  { name: "yellow", label: "Yellow", light: "bg-yellow-400", dark: "bg-yellow-500", gradient: "from-yellow-300 to-orange-500" },
  { name: "violet", label: "Violet", light: "bg-violet-500", dark: "bg-violet-600", gradient: "from-violet-400 to-purple-600" },
  { name: "green", label: "Green", light: "bg-green-500", dark: "bg-green-600", gradient: "from-emerald-400 to-teal-600" },
]

export function ColorSwitcher() {
  const { theme: mode, setTheme } = useTheme()
  const { color, setColor } = useThemeColor()
  const currentColor = availableThemeColors.find((c) => c.name === color)



  return (
    <section className="space-y-8 pt-2 pb-4">
      {/* Header */}
      <header className="relative">
        <div className="flex items-center gap-3 relative">
          <div className="p-2.5 rounded-xl bg-linear-to-br shadow-lg transition-all duration-300 bg-primary">
            <Palette className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
              Appearance
            </h2>
            <p className="text-xs text-muted-foreground">Customize your experience</p>
          </div>
        </div>
        <div className="absolute -bottom-3 left-0 right-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />
      </header>

      {/* Theme Mode Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Theme Mode
          </h4>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Light */}
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              mode === "light"
                ? "border-yellow-400 bg-linear-to-br from-yellow-50 to-orange-50 shadow-md"
                : "border-border bg-background/50 backdrop-blur-sm hover:border-yellow-200"
            )}
          >
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "rounded-full p-3 transition-all duration-300",
                  mode === "light"
                    ? "bg-linear-to-br from-yellow-400 to-orange-500 shadow-lg shadow-yellow-500/50"
                    : "bg-muted group-hover:bg-yellow-100"
                )}
              >
                <SunMedium
                  className={cn(
                    "h-5 w-5 transition-colors",
                    mode === "light" ? "text-white" : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  mode === "light" ? "text-yellow-900" : "text-foreground"
                )}
              >
                Light
              </span>
            </div>
            {mode === "light" && (
              <div className="absolute inset-0 bg-linear-to-br from-yellow-400/10 to-orange-400/10 animate-pulse" />
            )}
          </button>

          {/* Dark */}
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              mode === "dark"
                ? "border-blue-500 bg-linear-to-br from-slate-900 to-blue-950 shadow-md"
                : "border-border bg-background/50 backdrop-blur-sm hover:border-blue-200"
            )}
          >
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "rounded-full p-3 transition-all duration-300",
                  mode === "dark"
                    ? "bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/50"
                    : "bg-muted group-hover:bg-blue-100"
                )}
              >
                <Moon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    mode === "dark" ? "text-white" : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  mode === "dark" ? "text-blue-100" : "text-foreground"
                )}
              >
                Dark
              </span>
            </div>
            {mode === "dark" && (
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-indigo-500/10 animate-pulse" />
            )}
          </button>

          {/* System */}
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "group relative overflow-hidden rounded-xl border-2 p-4 transition-all duration-300",
              "hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]",
              mode === "system"
                ? "border-green-500 bg-linear-to-br from-emerald-50 to-green-400 shadow-md"
                : "border-border bg-background/50 backdrop-blur-sm hover:border-green-200"
            )}
          >
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={cn(
                  "rounded-full p-3 transition-all duration-300",
                  mode === "system"
                    ? "bg-linear-to-br from-emerald-400 to-green-500 shadow-lg shadow-green-500/50"
                    : "bg-muted group-hover:bg-green-100"
                )}
              >
                <Monitor
                  className={cn(
                    "h-5 w-5 transition-colors",
                    mode === "system" ? "text-white" : "text-muted-foreground"
                  )}
                />
              </div>
              <span
                className={cn(
                  "text-sm font-semibold",
                  mode === "system" ? "text-green-900" : "text-foreground"
                )}
              >
                System
              </span>
            </div>
            {mode === "system" && (
              <div className="absolute inset-0 bg-linear-to-br from-emerald-400/10 to-green-400/10 animate-pulse" />
            )}
          </button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Accent Color Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Accent Color
          </h4>
        </div>

        <div className="grid grid-cols-4 gap-3 sm:grid-cols-4 md:grid-cols-8">
          {availableThemeColors.map(({ name, label, gradient }) => {
            const isActive = color === name
            return (
              <button
                key={name}
                onClick={() => setColor(name)}
                title={label}
                className={cn(
                  "group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300",
                  "hover:scale-110 hover:shadow-xl active:scale-95",
                  isActive
                    ? "scale-105 shadow-xl ring-4 ring-offset-4 ring-offset-background"
                    : "hover:ring-2 hover:ring-offset-2 hover:ring-offset-background"
                )}
              >
                <div
                  className={cn(
                    "absolute inset-0 rounded-2xl bg-linear-to-br transition-all duration-300",
                    gradient,
                    isActive ? "opacity-100" : "opacity-90 group-hover:opacity-100"
                  )}
                />
                {isActive && (
                  <>
                    <span className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="h-3 w-3 rounded-full bg-white shadow-lg border-2 border-white/50 animate-pulse" />
                    </span>
                    <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-white shadow-md border-2 border-background z-20" />
                  </>
                )}
              </button>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-2 px-1">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "h-3 w-3 rounded-full border-2 border-white shadow-md bg-linear-to-br",
                currentColor?.gradient
              )}
            />
            <span className="text-sm font-medium text-muted-foreground">
              {currentColor?.label}
            </span>
          </div>
          <span className="text-xs text-muted-foreground/60">
            {availableThemeColors.length} colors
          </span>
        </div>
      </div>
    </section>
  )
}



