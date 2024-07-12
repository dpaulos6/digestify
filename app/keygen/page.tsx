'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { generateRandomSecret } from '@/helpers/keygen'
import PageWrapper from '@/components/PageWrapper'

export default function SecretGenerator() {
  const [secret32, setSecret32] = useState('')
  const [secret64, setSecret64] = useState('')

  useEffect(() => {
    setSecret32(generateRandomSecret(32))
    setSecret64(generateRandomSecret(64))
  }, [])

  return (
    <PageWrapper title="Your randomly generated Secrets.">
      <OutputWrapper title="32 characters">
        {secret32 ? secret32 : ' '}
      </OutputWrapper>
      <OutputWrapper title="64 characters">
        {secret64 ? secret64 : ' '}
      </OutputWrapper>
    </PageWrapper>
  )
}
