'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Custom404() {
  const router = useRouter()
  return (
    <main className="relative flex flex-1 flex-col items-center justify-center">
      <span className="text-5xl">Page not found!</span>
      <Button
        onClick={() => router.back()}
        className="mt-8 h-12 w-36 text-2xl"
      >
        Go Back
      </Button>
    </main>
  )
}
