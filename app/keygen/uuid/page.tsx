'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { generateUuid } from '@/helpers/uuid'
import PageWrapper from '@/components/PageWrapper'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  return (
    <PageWrapper title="Your randomly generated UUID.">
      <OutputWrapper title="UUID">{uuid ? uuid : ' '}</OutputWrapper>
    </PageWrapper>
  )
}
