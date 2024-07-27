'use client'

import { useState } from 'react'
import InputWrapper from '@/components/input-wrapper'
import PageWrapper from '@/components/PageWrapper'
import { Button } from '@/components/ui/button'
import { z } from 'zod'

const hashSchema = z
  .string()
  .min(1, 'Hash cannot be empty')
  .regex(/^[a-fA-F0-9]+$/, 'Hash must be a valid hexadecimal string')

const HashComparison = () => {
  const [hash1, setHash1] = useState('')
  const [hash2, setHash2] = useState('')
  const [result, setResult] = useState<null | boolean>(null)
  const [error, setError] = useState<string | null>(null)

  const validateHash = (hash: string): boolean => {
    try {
      hashSchema.parse(hash)
      return true
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message)
      }
      return false
    }
  }

  const compareHashes = () => {
    setError(null)
    if (validateHash(hash1) && validateHash(hash2)) {
      setResult(hash1 === hash2)
    } else {
      setResult(null)
    }
  }

  return (
    <PageWrapper title="Hash Comparison">
      <InputWrapper
        value={hash1}
        onChange={(value: string) => setHash1(value)}
        className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Enter a hash value"
      />
      <InputWrapper
        value={hash2}
        onChange={(value: string) => setHash2(value)}
        className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Enter a second hash value"
      />
      <Button
        type="button"
        className="flex w-full gap-2 text-base xs:w-fit"
        onClick={compareHashes}
      >
        Compare
      </Button>
      {error && (
        <div className="mt-2 text-center font-bold text-red-500">{error}</div>
      )}
      {result !== null && !error && (
        <div
          className="mt-2 text-center font-bold text-white"
          style={{ color: result ? '#31df4a' : 'red' }}
        >
          {result ? 'Hashes are identical' : 'Hashes are not identical'}
        </div>
      )}
    </PageWrapper>
  )
}

export default HashComparison
