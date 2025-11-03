"use client"

import { useTheme } from "next-themes"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useThemeColor } from "../../../../context/theme-color-context"
import { Moon, SunMedium, Palette, Laptop2 } from "lucide-react"

const availableThemeColors = [
  { name: "default", label: "Default", light: "bg-zinc-100", dark: "bg-zinc-800" },
  { name: "red", label: "Red", light: "bg-red-500", dark: "bg-red-600" },
  { name: "rose", label: "Rose", light: "bg-rose-500", dark: "bg-rose-600" },
  { name: "blue", label: "Blue", light: "bg-blue-500", dark: "bg-blue-600" },
  { name: "orange", label: "Orange", light: "bg-orange-500", dark: "bg-orange-600" },
  { name: "yellow", label: "Yellow", light: "bg-yellow-400", dark: "bg-yellow-500" },
  { name: "violet", label: "Violet", light: "bg-violet-500", dark: "bg-violet-600" },
  { name: "green", label: "Green", light: "bg-green-500", dark: "bg-green-600" },
]

export function ColorSwitcher() {
  const { theme: mode, setTheme } = useTheme()
  const { color, setColor } = useThemeColor()
  const currentColor = availableThemeColors.find((c) => c.name === color)

  return (
    <section className="space-y-8 pt-3">
      {/* Header */}
      <header className="flex items-center gap-2">
        <Palette className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-base font-semibold tracking-tight">Theme & Color</h2>
      </header>

      {/* Theme Mode Selector */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Theme Mode</h4>
          <Select value={mode} onValueChange={setTheme} >
            <SelectTrigger className="w-40 text-sm border-0">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="light">
                <div className="flex items-center gap-2">
                  <SunMedium className="h-4 w-4 text-yellow-500" />
                  Light
                </div>
              </SelectItem>
              <SelectItem value="dark">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-blue-400" />
                  Dark
                </div>
              </SelectItem>
              
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Accent Color */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Accent Color</h4>
          <Select value={color} onValueChange={setColor}>
            <SelectTrigger className="w-40 text-sm border-0">
              <SelectValue placeholder="Select color">
                {currentColor?.label}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {availableThemeColors.map(({ name, label, light, dark }) => (
                <SelectItem key={name} value={name}>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-4 w-4 rounded-full border",
                        mode === "light" ? light : dark
                      )}
                    />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color swatches */}
        <div className="mt-2 grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-8">
          {availableThemeColors.map(({ name, label, light, dark }) => {
            const isActive = color === name
            return (
              <button
                key={name}
                onClick={() => setColor(name)}
                title={label}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-full border shadow-sm transition-all duration-200",
                  "hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-muted-foreground/20",
                  isActive
                    ? "ring-2 ring-offset-2 ring-offset-background ring-foreground/40"
                    : "",
                  mode === "light" ? light : dark
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-white shadow" />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

     
    </section>
  )
}
