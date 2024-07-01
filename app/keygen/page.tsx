'use client'

import { useEffect, useState } from 'react'
import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import { Metadata } from 'next'
import { generateRandomSecret } from '@/helpers/crypto'

// export const metadata: Metadata = {
//   title: 'Digestify - Key Generation'
// }

export default function SecretGenerator() {
  const [secret32, setSecret32] = useState('')
  const [secret64, setSecret64] = useState('')

  useEffect(() => {
    setSecret32(generateRandomSecret(32))
    setSecret64(generateRandomSecret(64))
  }, [])

  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-3xl mt-12">
        Your randomly generated Secrets.
      </span>
      <section className="flex flex-col max-w-5xl items-start justify-center w-full gap-4 my-12 px-12">
        <div className="flex gap-2 items-center">
          <label className="text-lg font-semibold" htmlFor="keygen-secret-32">
            Secret 32 characters
          </label>
          <CopyToClipboardWrapper position="outside">
            {secret32}
          </CopyToClipboardWrapper>
        </div>
        <div className="flex gap-2 items-center">
          <label className="text-lg font-semibold" htmlFor="keygen-secret-64">
            Secret 64 characters
          </label>
          <CopyToClipboardWrapper position="outside">
            {secret64}
          </CopyToClipboardWrapper>
        </div>
      </section>
    </main>
  )
}
