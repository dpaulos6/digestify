'use client'
import { useState, useEffect } from 'react'
import {
  encryptTextAES,
  decryptTextAES,
  encryptTextBlowfish,
  decryptTextBlowfish
} from '@/helpers/encryption/encryption'
import OutputWrapper from '@/components/output-wrapper'
import InputWrapper from '@/components/input-wrapper'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import PageWrapper from '@/components/PageWrapper'

// Define type for encryption results
type EncryptedText = string

export default function Home() {
  const [text, setText] = useState<string>('')
  const [algorithm, setAlgorithm] = useState<string>('aes')
  const [encryptedText, setEncryptedText] = useState<EncryptedText>('')
  const [decryptedText, setDecryptedText] = useState<EncryptedText>('')

  // Encrypt text whenever the input changes
  useEffect(() => {
    if (!text) {
      setEncryptedText('')
      return
    }

    let encrypted: EncryptedText
    if (algorithm === 'aes') {
      encrypted = encryptTextAES(text)
    } else if (algorithm === 'blowfish') {
      encrypted = encryptTextBlowfish(text)
    } else {
      console.error('Invalid encryption algorithm selected')
      return
    }
    setEncryptedText(encrypted)
  }, [text, algorithm])

  // Decrypt text whenever the encryptedText input changes
  useEffect(() => {
    if (!encryptedText) {
      setDecryptedText('')
      return
    }

    let decrypted: string | undefined
    try {
      if (algorithm === 'aes') {
        decrypted = decryptTextAES(encryptedText)
      } else if (algorithm === 'blowfish') {
        decrypted = decryptTextBlowfish(encryptedText)
      } else {
        console.error('Invalid decryption algorithm selected')
        return
      }
    } catch (error) {
      console.error('Decryption failed', error)
      decrypted = 'Decryption failed or invalid data'
    }

    // Check if decrypted is undefined
    if (decrypted) {
      setDecryptedText(decrypted)
    } else {
      setDecryptedText('Decryption failed or invalid data')
    }
  }, [encryptedText, algorithm])

  return (
    <PageWrapper title="Encrypt and Decrypt Text">
      <div className="mb-2 w-full text-center">
        <span className="text-yellow-500 dark:text-yellow-300">WARNING: </span>
        If you encrypted text on a different website/tool, the decryption might
        due to different secret keys.
      </div>
      <div className="flex w-full flex-wrap items-center justify-start gap-3 sm:flex-row sm:justify-start">
        <Select
          onValueChange={(value: string) => {
            setAlgorithm(value)
          }}
          defaultValue={algorithm}
        >
          <SelectTrigger className="w-full border-2 text-base hover:bg-background-hover xs:w-[180px]">
            <SelectValue placeholder={algorithm} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="aes">AES</SelectItem>
              <SelectItem value="blowfish">Blowfish</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <InputWrapper
        value={text}
        onChange={(value: string) => setText(value)}
        className="h-auto min-h-32 flex-1 "
        placeholder="Enter text to encrypt"
      />
      <InputWrapper
        value={encryptedText}
        onChange={(value: string) => setEncryptedText(value)}
        className="h-auto min-h-32 flex-1 "
        placeholder="Enter text to decrypt"
      />
      <OutputWrapper title="Encrypted Text">{encryptedText}</OutputWrapper>
      <OutputWrapper title="Decrypted Text">{decryptedText}</OutputWrapper>
    </PageWrapper>
  )
}
