'use client'

import { useTheme } from 'next-themes'
import { themes } from '@/lib/themes'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useThemeColor } from '../../context/theme-color-context'

export function ThemeSwitcher() {
  const { theme: mode, setTheme: setMode } = useTheme()
  const { color, setColor } = useThemeColor()

  return (
    <div className="flex items-center gap-3">
      <Select value={color} onValueChange={setColor}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Theme color" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(themes).map((key) => (
            <SelectItem key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      >
        {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
      </Button>
    </div>
  )
}
