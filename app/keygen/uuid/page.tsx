"use client"

import PageWrapper from "@/components/PageWrapper"
import OutputWrapper from "@/components/output-wrapper"
import { generateUuid } from "@/helpers/keygen"
import { useEffect, useState } from "react"

export default function UuidGenerator() {
  const [uuid, setUuid] = useState("")

  useEffect(() => {
    setUuid(generateUuid())
  }, [])

  return (
    <PageWrapper title="Your randomly generated UUID.">
      <OutputWrapper title="UUID">{uuid ? uuid : " "}</OutputWrapper>
    </PageWrapper>
  )
}
