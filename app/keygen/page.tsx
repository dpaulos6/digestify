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
    <section className="my-12 flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 sm:px-12">
      <span className="mt-12 w-full text-center text-3xl sm:text-start">
        Your randomly generated Secrets.
      </span>
      <div className="flex w-fit flex-col items-center gap-2 sm:w-full">
        <label
          className="w-full text-lg font-semibold"
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
      <div className="flex w-fit flex-col items-start gap-2 sm:w-full">
        <label
          className="w-full text-lg font-semibold"
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
