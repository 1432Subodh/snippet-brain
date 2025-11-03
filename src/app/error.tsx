'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <h2 className="text-xl font-semibold text-destructive">Something went wrong!</h2>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
        Try again
      </button>
    </div>
  )
}
