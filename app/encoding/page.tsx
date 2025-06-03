"use client"

import PageWrapper from "@/components/PageWrapper"
import InputWrapper from "@/components/input-wrapper"
import OutputWrapper from "@/components/output-wrapper"
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
import { encodingTypes } from "@/helpers/encoding/encodingTypes"
import { ArrowDownUp } from "lucide-react"
import { useState } from "react"

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
    <>
      <PageWrapper
        title={`${isEncoding ? "Encode" : "Decode"} using ${encodingType}!`}
      >
        <div className="flex w-full flex-wrap items-center justify-start gap-3 sm:flex-row sm:justify-start">
          <Button
            type="button"
            className="flex w-full xs:w-fit gap-2 text-base"
            onClick={toggleMode}
          >
            <ArrowDownUp className="h-5 w-5" />
            {isEncoding ? "Switch to Decode" : "Switch to Encode"}
          </Button>
          <Select
            onValueChange={(value: string) => {
              setEncodingType(value)
              handleSubmit(input)
            }}
            defaultValue={encodingType}
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
          value={input}
          onChange={handleInputChange}
          className="h-auto min-h-52 flex-1 "
          placeholder={
            isEncoding ? "Paste a string to encode" : "Paste a string to decode"
          }
        />
        <OutputWrapper title={isEncoding ? "Encoded string" : "Decoded string"}>
          {output}
        </OutputWrapper>
      </PageWrapper>
    </>
  )
}
