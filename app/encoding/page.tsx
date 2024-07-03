'use client'

import { useState } from 'react'
import CopyToClipboardWrapper from '@/components/copy-to-clipboard'
import { Button } from '@/components/ui/button'
import {
  encodeBase64,
  decodeBase64,
  encodeBase32,
  decodeBase32,
  encodeBase58,
  decodeBase58
} from '@/helpers/base'

export default function Encryption() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isEncoding, setIsEncoding] = useState(true)
  const [encodingType, setEncodingType] = useState('base64')

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    let result
    switch (encodingType) {
      case 'base64':
        result = isEncoding ? encodeBase64(input) : decodeBase64(input)
        break
      case 'base32':
        result = isEncoding ? encodeBase32(input) : decodeBase32(input)
        break
      case 'base58':
        result = isEncoding ? encodeBase58(input) : decodeBase58(input)
        break
      default:
        result = ''
    }
    setOutput(result)
  }

  const toggleMode = () => {
    setIsEncoding(!isEncoding)
    setInput('')
    setOutput('')
  }

  return (
    <main className="flex-1 flex flex-col items-center">
      <span className="flex items-center gap-2 text-3xl mt-12">
        Encode & Decode
      </span>

      <section className="flex flex-col max-w-5xl items-center justify-center w-full gap-4 my-12 px-12">
        <div className="flex gap-4 items-center">
          <div className="flex flex-col gap-1 w-full">
            <textarea
              name="input"
              id="input"
              className="w-full min-h-52 h-auto ring-1 ring-border rounded-md resize-none p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default"
              placeholder={
                isEncoding
                  ? 'Paste a string to encode'
                  : 'Paste a string to decode'
              }
              value={input}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="flex flex-col gap-1 w-full relative">
            <CopyToClipboardWrapper
              contentType="textarea"
              className="w-full min-h-52 h-auto ring-1 ring-border rounded-md resize-none p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary hover:ring-primary transition cursor-default disabled:cursor-not-allowed disabled:hover:ring-border"
            >
              {output}
            </CopyToClipboardWrapper>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            type="button"
            className="flex gap-2 mx-auto px-8 text-lg mt-4"
            onClick={handleSubmit}
          >
            {isEncoding ? 'Encode' : 'Decode'}
          </Button>
          <Button
            type="button"
            className="flex gap-2 mx-auto px-8 text-lg mt-4"
            onClick={toggleMode}
          >
            {isEncoding ? 'Switch to Decode' : 'Switch to Encode'}
          </Button>
        </div>

        <div className="flex gap-4 mt-4">
          {['base64', 'base32', 'base58'].map((type) => (
            <label
              key={type}
              className={`flex items-center gap-2 p-2 border rounded-md cursor-pointer `}
            >
              <input
                type="radio"
                name="encoding"
                value={type}
                checked={encodingType === type}
                onChange={() => setEncodingType(type)}
                className="hidden"
              />
              <span
                className={`w-4 h-4 inline-block border rounded-full ${
                  encodingType === type ? 'bg-primary' : 'bg-transparent'
                }`}
              />
              {type.toUpperCase()}
            </label>
          ))}
        </div>
      </section>
    </main>
  )
}
