'use client'

import { useEffect, useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import PageWrapper from '@/components/PageWrapper'
import {
  generateAESKey,
  generateRSAKeyPair,
  type KeyPair
} from '@/helpers/keygen'

export default function Page() {
  const [AESKey, setAESKey] = useState<string>('')
  const [RSAKeys, setRSAKeys] = useState<KeyPair | null>(null)

  useEffect(() => {
    async function fetchKeys() {
      const aesKey = generateAESKey()
      setAESKey(aesKey)

      try {
        const rsaKeys = await generateRSAKeyPair()
        console.log('RSA keys generated:', rsaKeys)
        setRSAKeys(rsaKeys)
      } catch (error) {
        console.error('Error generating RSA keys:', error)
      }
    }

    fetchKeys()
  }, [])

  return (
    <PageWrapper title="Your randomly generated cryptographic keys.">
      <OutputWrapper title="AES Key">{AESKey || ' '}</OutputWrapper>
      <OutputWrapper title="RSA Public Key">
        {RSAKeys?.publicKey || ' '}
      </OutputWrapper>
      <OutputWrapper title="RSA Private Key">
        {RSAKeys?.privateKey || ' '}
      </OutputWrapper>
    </PageWrapper>
  )
}
