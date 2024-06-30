'use client'

import { CopyIcon, Check } from 'lucide-react'
import { useState } from 'react'
import { digest } from '@/helpers/bcrypt'
import { copyToClipboard } from '@/helpers/clipboard'

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

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement>) => {
    copyToClipboard(hashedValue, event.currentTarget)
  }

  return (
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
            {hashedValue && (
              <button
                id="copyBtn"
                className="absolute bottom-2 right-2 z-10 flex items-center gap-1 w-fit p-1 hover:bg-foreground/5 text-neutral-600 dark:text-neutral-300 rounded-md group-hover:opacity-100 group-hover:pointer-events-auto transition select-none"
                onClick={handleCopy}
              >
                <CopyIcon className="h-6 w-6" />
              </button>
            )}
            <textarea
              name="output"
              id="output"
              className="flex w-full min-h-52 h-auto ring-1 ring-border rounded-md resize-none p-2 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary [&:not(:disabled)]:hover:ring-primary disabled:cursor-not-allowed transition cursor-default"
              placeholder="Your hashed string"
              value={hashedValue}
              disabled={!hashedValue}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
