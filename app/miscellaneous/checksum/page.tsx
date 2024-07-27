'use client'

import React, { useState, useEffect } from 'react'
import { generateChecksum } from '@/helpers/miscellaneous/checksum'
import PageWrapper from '@/components/PageWrapper'
import InputWrapper from '@/components/input-wrapper'
import OutputWrapper from '@/components/output-wrapper'

const ChecksumGenerator: React.FC = () => {
  const [input, setInput] = useState('')
  const [checksum, setChecksum] = useState('')

  useEffect(() => {
    if (input.trim() === '') {
      setChecksum('')
    } else {
      const hash = generateChecksum(input)
      setChecksum(hash)
    }
  }, [input])

  return (
    <PageWrapper title={`Checksum Generator!`}>
      <InputWrapper
        value={input}
        onChange={(value) => setInput(value)}
        className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Type or paste anything."
      />
      <OutputWrapper title="Checksum">{checksum}</OutputWrapper>
    </PageWrapper>
  )
}

export default ChecksumGenerator
