'use client'

import { useState } from 'react'
import { digest } from '@/helpers/bcrypt'
import OutputWrapper from '@/components/output-wrapper'
import Head from 'next/head'
import InputWrapper from '@/components/input-wrapper'

export default function Home() {
  const [inputValue, setInputValue] = useState('')
  const [hashedValue, setHashedValue] = useState('')

  const updateValue = async (value: string) => {
    setInputValue(value)
    if (value) {
      try {
        const hashedResult = await digest(value)
        setHashedValue(hashedResult)
      } catch (error) {
        console.error('Error while hashing:', error)
      }
    } else {
      setHashedValue('')
    }
  }

  return (
    <>
      <Head>
        <title>Digestify - Hashing Tools</title>
      </Head>
      <section className="flex w-full max-w-5xl flex-col justify-center gap-10 px-12 py-16">
        <span className="mt-12 flex items-center justify-center gap-2 text-center text-3xl">
          Hash your data at lightspeed!
        </span>
        <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2">
          <InputWrapper
            value={inputValue}
            onChange={(value) => updateValue(value)}
            className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            placeholder="Paste a hashed string"
          />
          <OutputWrapper className="h-auto min-h-52 w-full cursor-default rounded-md bg-white ring-1 ring-border transition hover:ring-primary dark:bg-[#121212]">
            {hashedValue}
          </OutputWrapper>
        </div>
      </section>
    </>
  )
}
