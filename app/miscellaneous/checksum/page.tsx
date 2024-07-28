'use client'
import React, { useState, useEffect } from 'react'
import { generateChecksum } from '@/helpers/miscellaneous/checksum'
import PageWrapper from '@/components/PageWrapper'
import InputWrapper from '@/components/input-wrapper'
import OutputWrapper from '@/components/output-wrapper'

const ChecksumGenerator: React.FC = () => {
  const [input, setInput] = useState('')
  const [checksum, setChecksum] = useState('')
  const [providedChecksum, setProvidedChecksum] = useState('')
  const [isChecksumValid, setIsChecksumValid] = useState<boolean | null>(null)

  useEffect(() => {
    if (input.trim() === '') {
      setChecksum('')
      setIsChecksumValid(null)
    } else {
      const hash = generateChecksum(input)
      setChecksum(hash)
    }
  }, [input])

  const handleVerifyChecksum = () => {
    const isValid = checksum === providedChecksum.trim()
    setIsChecksumValid(isValid)
  }

  return (
    <PageWrapper title="Checksum Generator!">
      <InputWrapper
        value={input}
        onChange={(value) => setInput(value)}
        className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Type or paste anything."
      />
      <OutputWrapper title="Checksum">{checksum}</OutputWrapper>

      <div className="mx-auto mt-4">
        <h2 className="mb-2 text-center text-lg font-semibold">
          Verify Checksum
        </h2>
        <InputWrapper
          value={providedChecksum}
          onChange={(value) => setProvidedChecksum(value)}
          className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          placeholder="Enter checksum to verify"
        />
        <button
          onClick={handleVerifyChecksum}
          className="w-full rounded bg-primary p-2 text-black"
        >
          Verify Checksum
        </button>
        {isChecksumValid !== null && (
          <div
            className={`mt-2 rounded p-2 ${isChecksumValid ? 'text-green-500' : 'text-red-500'}`}
          >
            {isChecksumValid ? 'Checksum is valid!' : 'Checksum is invalid!'}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default ChecksumGenerator
