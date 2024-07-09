'use client'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Return() {
  const router = useRouter()

  return (
    <button
      className="group mr-auto flex w-fit items-center gap-2 rounded-md bg-background-hover p-2 transition hover:bg-foreground/10"
      onClick={() => router.back()}
    >
      <ArrowLeft className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />
      <span className="mr-2 text-sm xs:text-base sm:text-lg">Go back</span>
    </button>
  )
}
