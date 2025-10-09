"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import InputWrapper from "@/components/input-wrapper"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  decryptTextAES,
  decryptTextBlowfish,
  encryptTextAES,
  encryptTextBlowfish
} from "@/helpers/encryption"

// Define type for encryption results
type EncryptedText = string

export default function Home() {
  const [text, setText] = useState<string>("")
  const [algorithm, setAlgorithm] = useState<string>("aes")
  const [encryptedText, setEncryptedText] = useState<EncryptedText>("")
  const [decryptedText, setDecryptedText] = useState<EncryptedText>("")

  // Encrypt text whenever the input changes
  useEffect(() => {
    if (!text) {
      setEncryptedText("")
      return
    }

    let encrypted: EncryptedText
    if (algorithm === "aes") {
      encrypted = encryptTextAES(text)
    } else if (algorithm === "blowfish") {
      encrypted = encryptTextBlowfish(text)
    } else {
      toast.error("Invalid encryption algorithm selected")
      return
    }
    setEncryptedText(encrypted)
  }, [text, algorithm])

  // Decrypt text whenever the encryptedText input changes
  useEffect(() => {
    if (!encryptedText) {
      setDecryptedText("")
      return
    }

    let decrypted: string | undefined
    try {
      if (algorithm === "aes") {
        decrypted = decryptTextAES(encryptedText)
      } else if (algorithm === "blowfish") {
        decrypted = decryptTextBlowfish(encryptedText)
      } else {
        toast.error("Invalid decryption algorithm selected")
        return
      }
    } catch (error) {
      toast.error(`Decryption failed: ${error}`)
      decrypted = "Decryption failed or invalid data"
    }

    // Check if decrypted is undefined
    if (decrypted) {
      setDecryptedText(decrypted)
    } else {
      setDecryptedText("Decryption failed or invalid data")
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
          defaultValue={algorithm}
          onValueChange={(value: string) => {
            setAlgorithm(value)
          }}
        >
          <SelectTrigger className="w-full xs:w-[180px] border-2 text-base hover:bg-background-hover">
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
        className="h-auto min-h-32 flex-1"
        onChange={(value: string) => setText(value)}
        placeholder="Enter text to encrypt"
        value={text}
      />
      <InputWrapper
        className="h-auto min-h-32 flex-1"
        onChange={(value: string) => setEncryptedText(value)}
        placeholder="Enter text to decrypt"
        value={encryptedText}
      />
      <OutputWrapper title="Encrypted Text">{encryptedText}</OutputWrapper>
      <OutputWrapper title="Decrypted Text">{decryptedText}</OutputWrapper>
    </PageWrapper>
  )
}
