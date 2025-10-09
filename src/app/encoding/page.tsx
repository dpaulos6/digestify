"use client"

import { ArrowDownUp } from "lucide-react"
import { useState } from "react"
import InputWrapper from "@/components/input-wrapper"
import OutputWrapper from "@/components/output-wrapper"
import PageWrapper from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  decodeBase32,
  decodeBase58,
  decodeBase64,
  encodeBase32,
  encodeBase58,
  encodeBase64
} from "@/helpers/encoding"
import { encodingTypes } from "@/helpers/encoding/encoding-types"

export default function Encryption() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isEncoding, setIsEncoding] = useState(true)
  const [encodingType, setEncodingType] = useState(encodingTypes[0])

  const handleInputChange = (value: string) => {
    setInput(value)
    if (value) {
      handleSubmit(value)
    } else {
      setOutput("")
    }
  }

  const handleSubmit = (inputValue: string = input) => {
    let result: string
    switch (encodingType.toLowerCase()) {
      case "base64":
        result = isEncoding
          ? encodeBase64(inputValue)
          : decodeBase64(inputValue)
        break
      case "base32":
        result = isEncoding
          ? encodeBase32(inputValue)
          : decodeBase32(inputValue)
        break
      case "base58":
        result = isEncoding
          ? encodeBase58(inputValue)
          : decodeBase58(inputValue)
        break
      default:
        result = ""
    }
    setOutput(result)
  }

  const toggleMode = () => {
    setIsEncoding(!isEncoding)
    setInput(output ? output : "")
    setOutput(input ? input : "")
  }

  return (
    <PageWrapper
      title={`${isEncoding ? "Encode" : "Decode"} using ${encodingType}!`}
    >
      <div className="flex w-full flex-wrap items-center justify-start gap-3 sm:flex-row sm:justify-start">
        <Button
          className="flex w-full xs:w-fit gap-2 text-base"
          onClick={toggleMode}
          type="button"
        >
          <ArrowDownUp className="h-5 w-5" />
          {isEncoding ? "Switch to Decode" : "Switch to Encode"}
        </Button>
        <Select
          defaultValue={encodingType}
          onValueChange={(value: string) => {
            setEncodingType(value)
            handleSubmit(input)
          }}
        >
          <SelectTrigger className="w-full xs:w-[180px] border-2 text-base hover:bg-background-hover">
            <SelectValue placeholder={encodingType} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {encodingTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                >
                  {type}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <InputWrapper
        className="h-auto min-h-52 flex-1"
        onChange={handleInputChange}
        placeholder={
          isEncoding ? "Paste a string to encode" : "Paste a string to decode"
        }
        value={input}
      />
      <OutputWrapper title={isEncoding ? "Encoded string" : "Decoded string"}>
        {output}
      </OutputWrapper>
    </PageWrapper>
  )
}
