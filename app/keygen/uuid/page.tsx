'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { generateUuid } from '@/helpers/uuid'
import { cn } from '@/lib/utils'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')
  const [screenSize, setScreenSize] = useState('sm')

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  useEffect(() => {
    function checkScreenSize() {
      const smallBreakpoint = window.matchMedia('(max-width: 640px)')
      const mediumBreakpoint = window.matchMedia('(min-width: 768px)')
      const largeBreakpoint = window.matchMedia('(min-width: 1024px)')

      if (smallBreakpoint.matches) {
        setScreenSize('sm')
      } else if (mediumBreakpoint.matches) {
        setScreenSize('md')
      } else if (largeBreakpoint.matches) {
        setScreenSize('lg')
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <section className="my-12 flex w-full max-w-5xl flex-col justify-center gap-4 px-4 sm:px-12">
      <span className="mt-12 w-full text-center text-3xl sm:text-start">
        Your randomly generated UUID.
      </span>
      <div className="mx-auto flex w-fit flex-col items-center gap-2 sm:mx-0 sm:w-full">
        <label
          className="w-full text-lg font-semibold"
          htmlFor="uuid-output"
        >
          UUID
        </label>
        <OutputWrapper
          className={cn('w-full', !uuid && 'text-transparent')}
          type="code"
          buttonPosition="outside"
        >
          {uuid ? uuid : '.'.repeat(36)}
        </OutputWrapper>
      </div>
    </section>
  )
}
