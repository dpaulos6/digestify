'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Return() {
  const [canGoBack, setCanGoBack] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if there's history to go back
    setCanGoBack(window.history.length > 1)
  }, [])

  const handleButtonClick = () => {
    if (canGoBack) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button
      type="button"
      className="group mr-auto flex w-fit items-center gap-2 rounded-md bg-background-hover p-2 transition hover:bg-foreground/10"
      onClick={handleButtonClick}
    >
      <ArrowLeft className="h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7" />
      <span className="mr-2 text-sm xs:text-base sm:text-lg">
        {canGoBack ? 'Go Back' : 'Home'}
      </span>
    </button>
  )
}
