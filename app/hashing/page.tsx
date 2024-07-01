'use client'

import { useState } from 'react'
import { digest } from '@/helpers/bcrypt'
import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import Head from 'next/head'

export default function Home() {
  const [hashedValue, setHashedValue] = useState('')

  const updateValue = async (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value
    if (inputValue) {
      try {
        const hashedResult = await digest(inputValue)
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
          <div className="flex gap-4 items-center">
            <div className="flex flex-col gap-1 w-full">
              <textarea
                name="input"
                id="input"
                className="w-full min-h-52 h-auto ring-1 ring-border rounded-md resize-none p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default"
                placeholder="Paste a hashed string"
                onChange={updateValue}
              />
            </div>
            <div className="flex flex-col gap-1 w-full relative">
              <CopyToClipboardWrapper
                contentType="textarea"
                className="w-full min-h-52 h-auto ring-1 ring-border rounded-md resize-none p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default disabled:cursor-not-allowed disabled:hover:ring-border"
              >
                {hashedValue}
              </CopyToClipboardWrapper>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
