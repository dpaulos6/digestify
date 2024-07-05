'use client'

import { useState } from 'react'
import OutputWrapper from '@/components/output-wrapper'
import { Button } from '@/components/ui/button'
import {
  encodeBase64,
  decodeBase64,
  encodeBase32,
  decodeBase32,
  encodeBase58,
  decodeBase58
} from '@/helpers/base'
import { ArrowDownUp } from 'lucide-react'
import InputWrapper from '@/components/input-wrapper'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

export default function Encryption() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isEncoding, setIsEncoding] = useState(true)
  const [encodingType, setEncodingType] = useState('base64')

  const handleInputChange = (value: string) => {
    setInput(value)
    if (value) {
      handleSubmit(value)
    } else {
      setOutput('')
    }
  }

  const handleSubmit = (inputValue: string = input) => {
    let result
    switch (encodingType) {
      case 'base64':
        result = isEncoding
          ? encodeBase64(inputValue)
          : decodeBase64(inputValue)
        break
      case 'base32':
        result = isEncoding
          ? encodeBase32(inputValue)
          : decodeBase32(inputValue)
        break
      case 'base58':
        result = isEncoding
          ? encodeBase58(inputValue)
          : decodeBase58(inputValue)
        break
      default:
        result = ''
    }
    setOutput(result)
  }

  const toggleMode = () => {
    setIsEncoding(!isEncoding)
    setInput(output)
    setOutput(input)
  }

  return (
    <section className="flex flex-col max-w-5xl w-full gap-3 justify-center py-32 px-6 sm:px-12">
      <span className="text-center text-3xl mb-6">Encode & Decode</span>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex flex-col gap-1 w-full">
          <InputWrapper
            value={input}
            onChange={handleInputChange}
            className="flex-1 min-h-52 h-auto ring-1 ring-border rounded-md resize-none focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default"
            placeholder={
              isEncoding
                ? 'Paste a string to encode'
                : 'Paste a string to decode'
            }
          />
        </div>

        <div className="flex flex-col gap-1 w-full relative">
          <OutputWrapper className="w-full min-h-52 h-auto bg-white dark:bg-[#121212] ring-1 ring-border rounded-md hover:ring-primary transition cursor-default">
            {output}
          </OutputWrapper>
        </div>
      </div>
      <div className="flex flex-wrap sm:flex-row gap-3 items-center justify-center sm:justify-start">
        <Button
          type="button"
          className="flex w-full xs:w-fit gap-2 text-base"
          onClick={toggleMode}
        >
          <ArrowDownUp className="w-5 h-5" />
          {isEncoding ? 'Switch to Decode' : 'Switch to Encode'}
        </Button>
        <Select
          onValueChange={(value: string) => {
            setEncodingType(value)
            handleSubmit(input)
          }}
          defaultValue={encodingType}
        >
          <SelectTrigger className="w-full xs:w-[180px] border-2 hover:bg-foreground/5 text-base">
            <SelectValue placeholder={encodingType} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {['base64', 'base32', 'base58'].map((type) => (
                <SelectItem key={type} value={type}>
                  {type.toLocaleUpperCase()}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}
