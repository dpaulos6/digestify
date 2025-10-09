"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import {
  generateAESKey,
  generateRSAKeyPair
} from "@/helpers/keygen/cryptographic"
import type { KeyPair } from "@/helpers/keygen/interfaces"

export default function Page() {
  const [AESKey, setAESKey] = useState<string>("")
  const [RSAKeys, setRSAKeys] = useState<KeyPair | null>(null)

  useEffect(() => {
    async function fetchKeys() {
      const aesKey = generateAESKey()
      setAESKey(aesKey)

      try {
        const rsaKeys = await generateRSAKeyPair()
        setRSAKeys(rsaKeys)
      } catch (error) {
        toast.error(`Error generating RSA keys: ${error}`)
      }
    }

    fetchKeys()
  }, [])

  return (
    <PageWrapper title="Your randomly generated cryptographic keys.">
      <OutputWrapper title="AES Key">{AESKey || " "}</OutputWrapper>
      <OutputWrapper title="RSA Public Key">
        {RSAKeys?.publicKey || " "}
      </OutputWrapper>
      <OutputWrapper title="RSA Private Key">
        {RSAKeys?.privateKey || " "}
      </OutputWrapper>
    </PageWrapper>
  )
}
