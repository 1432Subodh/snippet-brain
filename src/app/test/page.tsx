import { Button } from "@/components/ui/button"

// app/page.tsx
export default async function HomePage() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/4', {
    cache: 'no-store', // makes Next show loading.tsx
  })

  if (!res.ok) throw new Error('Failed to fetch data')

  const data = await res.json()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-primary">Post Title</h1>
      <p className="mt-2 text-muted-foreground">{data.title}</p>
      <Button>LOGIn</Button>
    </div>
  )
}
