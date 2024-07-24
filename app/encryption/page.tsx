'use client'
import { useState } from 'react'
import {
  encryptTextAES,
  decryptTextAES,
  encryptTextBlowfish,
  decryptTextBlowfish
} from '@/helpers/encryption/encryption'
import OutputWrapper from '@/components/output-wrapper'
import { Button } from '@/components/ui/button'
import { ArrowDownUp } from 'lucide-react'
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
  const [decryptedText, setDecryptedText] = useState<string>('')

  const handleEncrypt = () => {
    let encrypted: EncryptedText
    if (algorithm === 'aes') {
      encrypted = encryptTextAES(text)
    } else if (algorithm === 'blowfish') {
      encrypted = encryptTextBlowfish(text)
    } else {
      return // Handle invalid algorithm case
    }
    setEncryptedText(encrypted)
  }

  const handleDecrypt = () => {
    let decrypted: string | undefined
    if (algorithm === 'aes') {
      decrypted = decryptTextAES(encryptedText)
    } else if (algorithm === 'blowfish') {
      decrypted = decryptTextBlowfish(encryptedText)
    }
    // Check if decrypted is undefined
    if (decrypted !== undefined) {
      setDecryptedText(decrypted)
    } else {
      setDecryptedText('Decryption failed or invalid data')
    }
  }

  return (
    <PageWrapper title="Encrypt and Decrypt Text">
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
        className="h-auto min-h-52 flex-1 cursor-default resize-none rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        placeholder="Enter text to encrypt"
      />
      <div className="flex w-full flex-wrap items-center justify-start gap-3 sm:flex-row sm:justify-start">
        <Button
          type="button"
          className="flex w-full gap-2 text-base xs:w-fit"
          onClick={handleEncrypt}
        >
          Encrypt
        </Button>
        <Button
          type="button"
          className="flex w-full gap-2 text-base xs:w-fit"
          onClick={handleDecrypt}
        >
          Decrypt
        </Button>
      </div>
      <OutputWrapper title="Encrypted Text">
        <pre>{encryptedText}</pre>
      </OutputWrapper>
      <OutputWrapper title="Decrypted Text">
        <pre>{decryptedText}</pre>
      </OutputWrapper>
    </PageWrapper>
  )
}
