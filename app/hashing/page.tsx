'use client'

import { useState } from 'react'
import { digest } from '@/helpers/bcrypt'
import OutputWrapper from '@/components/output-wrapper'
import Head from 'next/head'
import InputWrapper from '@/components/input-wrapper'
import { Hash } from 'lucide-react'
import Return from '@/components/return'
import PageWrapper from '@/components/PageWrapper'

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
      <PageWrapper title="Hash your data at lightspeed!">
        <InputWrapper
          value={inputValue}
          onChange={(value) => updateValue(value)}
          className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Type or paste anything to hash it"
        />
        <OutputWrapper title="Hashed string">{hashedValue}</OutputWrapper>
      </PageWrapper>
      <Hash className="absolute bottom-16 right-[15%] -z-10 h-auto w-60 translate-y-1/4 rotate-12 opacity-25" />
    </>
  )
}
