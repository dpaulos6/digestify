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
    <section className="flex flex-col items-center justify-center w-full gap-4 my-12 px-4 sm:px-12 max-w-5xl">
      <span className="flex items-center gap-2 text-3xl mt-12 text-center px-4">
        Your randomly generated UUID.
      </span>
      <div className="flex flex-col gap-2 items-center w-fit sm:w-full">
        <label className="text-lg font-semibold w-full" htmlFor="uuid-output">
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
