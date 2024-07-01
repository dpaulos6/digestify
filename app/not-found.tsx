'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Custom404() {
  const router = useRouter()
  return (
    <main className="flex flex-col flex-1 items-center justify-center relative">
      <span className="text-5xl">Page not found!</span>
      <Button onClick={() => router.back()} className="mt-8 text-2xl h-12 w-36">
        Go Back
      </Button>
    </main>
  )
}
