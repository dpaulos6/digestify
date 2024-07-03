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
      <main className="flex-1 flex flex-col items-center">
        <section className="flex flex-col max-w-5xl w-full gap-10 justify-center my-12 px-12">
          <span className="text-5xl text-center">
            Hash your data at lightspeed!
          </span>
          <div className="grid grid-cols-2 gap-4 items-center w-full">
            <InputWrapper
              value={inputValue}
              onChange={(value) => updateValue(value)}
              className="flex-1 min-h-52 h-auto ring-1 ring-border rounded-md resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default"
              placeholder="Paste a hashed string"
            />
            <OutputWrapper className="w-full min-h-52 h-auto bg-white dark:bg-[#121212] ring-1 ring-border rounded-md hover:ring-primary transition cursor-default">
              {hashedValue}
            </OutputWrapper>
          </div>
        </section>
      </main>
    </>
  )
}
