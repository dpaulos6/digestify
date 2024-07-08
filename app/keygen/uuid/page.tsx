'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { generateUuid } from '@/helpers/uuid'
import { cn } from '@/lib/utils'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  return (
    <section className="my-12 flex w-full max-w-5xl flex-col items-center justify-center gap-4 px-4 sm:px-12">
      <span className="mt-12 flex items-center gap-2 px-4 text-center text-3xl">
        Your randomly generated UUID.
      </span>
      <div className="flex w-fit flex-col items-center gap-2 sm:w-full">
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
