'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { generateRandomSecret } from '@/helpers/crypto'
import { cn } from '@/lib/utils'

export default function SecretGenerator() {
  const [secret32, setSecret32] = useState('')
  const [secret64, setSecret64] = useState('')
  const [screenSize, setScreenSize] = useState('sm')

  useEffect(() => {
    setSecret32(generateRandomSecret(32))
    setSecret64(generateRandomSecret(64))
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
        Your randomly generated Secrets.
      </span>
      <div className="flex flex-col gap-2 items-center w-fit sm:w-full">
        <label
          className="text-lg font-semibold w-full"
          htmlFor="keygen-secret-32"
        >
          Secret 32 characters
        </label>
        <OutputWrapper
          className={cn('w-full', !secret32 && 'text-transparent')}
          type="code"
          buttonPosition="outside"
        >
          {secret32 ? secret32 : '.'.repeat(32)}
        </OutputWrapper>
      </div>
      <div className="flex flex-col gap-2 items-start w-fit sm:w-full">
        <label
          className="text-lg font-semibold w-full"
          htmlFor="keygen-secret-64"
        >
          Secret 64 characters
        </label>
        <OutputWrapper
          className={cn('w-full', !secret64 && 'text-transparent')}
          type="code"
          buttonPosition="outside"
        >
          {secret64 ? secret64 : '.'.repeat(64)}
        </OutputWrapper>
      </div>
    </section>
  )
}
