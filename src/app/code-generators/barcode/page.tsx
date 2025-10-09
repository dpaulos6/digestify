"use client"

import Head from "next/head"
import { useRef, useState } from "react"
import Barcode from "react-barcode"
import InputWrapper from "@/components/input-wrapper"
import PageWrapper from "@/components/page-wrapper"
import { Button } from "@/components/ui/button"

export default function BarcodePage() {
  const [inputValue, setInputValue] = useState("")
  const barcodeRef = useRef<HTMLDivElement>(null)

  const handleDownload = () => {
    const svg = barcodeRef.current?.querySelector("svg")
    if (!svg) return

    const serializer = new XMLSerializer()
    const svgData = serializer.serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      const pngUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = pngUrl
      link.download = "barcode.png"
      link.click()
    }

    img.src = url
  }

  return (
    <>
      <Head>
        <title>Digestify - Barcode Generator</title>
      </Head>
      <PageWrapper title={"Generate a Barcode!"}>
        <InputWrapper
          value={inputValue}
          onChange={(value) => setInputValue(value)}
          className="max-h-12 flex-1"
          placeholder="Enter any value to generate a barcode."
        />
        {inputValue && (
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-4">
            <div ref={barcodeRef}>
              <Barcode value={inputValue} />
            </div>
            <Button
              onClick={handleDownload}
              className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90"
            >
              Download Barcode
            </Button>
          </div>
        )}
      </PageWrapper>
    </>
  )
}
