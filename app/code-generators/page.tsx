"use client"

import PageWrapper from "@/components/PageWrapper"
import InputWrapper from "@/components/input-wrapper"
import Head from "next/head"
import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { z } from "zod"

const urlSchema = z.string().url()

export default function Home() {
  const [inputValue, setInputValue] = useState("")

  const isValidUrl = urlSchema.safeParse(inputValue).success

  return (
    <>
      <Head>
        <title>Digestify - Code Generators</title>
      </Head>
      <PageWrapper title={"Generate a QR Code!"}>
        <InputWrapper
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          className="max-h-12 flex-1"
          placeholder="Paste a valid URL to generate a QR code."
        />
        {inputValue && !isValidUrl && (
          <p className="mt-2 text-sm text-red-500">Please enter a valid URL.</p>
        )}
        {isValidUrl && (
          <div className="flex justify-center mt-4">
            <QRCodeSVG
              value={inputValue}
              size={256}
              bgColor="#ffffff00"
              fgColor="var(--color-foreground)"
              level="Q"
            />
          </div>
        )}
      </PageWrapper>
    </>
  )
}
