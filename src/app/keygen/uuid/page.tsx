"use client"

import { useEffect, useState } from "react"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import { generateUuid } from "@/helpers/keygen/uuid"

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
