// app/loading.tsx
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground transition-opacity duration-300">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="mt-3 text-sm font-medium text-muted-foreground">Loading...</p>
    </div>
  )
}
