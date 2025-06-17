"use client"

import PageWrapper from "@/components/PageWrapper"
import InputWrapper from "@/components/input-wrapper"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import Head from "next/head"
import { QRCodeSVG } from "qrcode.react"
import { useRef, useState } from "react"

type QRType = "text" | "wifi" | "email" | "phone"

export default function Home() {
  const [qrType, setQrType] = useState<QRType>("text")
  const [input, setInput] = useState("")
  const [wifi, setWifi] = useState({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false
  })
  const [email, setEmail] = useState({ to: "", subject: "", body: "" })
  const [phone, setPhone] = useState("")
  const qrRef = useRef<SVGSVGElement>(null)

  const escapeValue = (val: string) => val.replace(/([\\;,":])/g, "\\$1")

  const getQRCodeValue = () => {
    switch (qrType) {
      case "wifi": {
        const { ssid, password, encryption, hidden } = wifi
        return `WIFI:T:${encryption};S:${escapeValue(ssid)};P:${escapeValue(password)};${hidden ? "H:true;" : ""};`
      }
      case "email": {
        const { to, subject, body } = email
        return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }
      case "phone":
        return `tel:${phone}`
      default:
        return input.trim()
    }
  }

  const isValid = () => {
    switch (qrType) {
      case "text":
        return input.trim().length > 0
      case "wifi":
        return wifi.ssid.trim().length > 0
      case "email":
        return email.to.trim().length > 0
      case "phone":
        return phone.trim().length > 0
      default:
        return false
    }
  }

  const handleDownload = () => {
    const svg = qrRef.current
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      const scale = 4
      const padding = 15 * scale

      const width = img.width * scale
      const height = img.height * scale

      canvas.width = width + padding * 2
      canvas.height = height + padding * 2

      if (ctx) {
        ctx.imageSmoothingEnabled = false
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, padding, padding, width, height)
      }

      URL.revokeObjectURL(url)

      const pngUrl = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "qrcode.png"
      downloadLink.click()
    }

    img.src = url
  }

  return (
    <>
      <Head>
        <title>Digestify - QR Code Generator</title>
      </Head>
      <PageWrapper title="Generate a QR Code">
        <div className="mb-4 flex flex-col gap-2">
          <span className="font-medium text-sm">QR Code Type</span>
          <Select
            value={qrType}
            onValueChange={(val) => setQrType(val as QRType)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select QR Code Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text / URL</SelectItem>
              <SelectItem value="wifi">WiFi Access</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone Number</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {qrType === "text" && (
          <InputWrapper
            value={input}
            onChange={setInput}
            placeholder="Enter text or URL"
          />
        )}

        {qrType === "wifi" && (
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <InputWrapper
                value={wifi.ssid}
                onChange={(val) => setWifi({ ...wifi, ssid: val })}
                placeholder="WiFi SSID"
                className="md:basis-1/2"
              />
              <InputWrapper
                value={wifi.password}
                onChange={(val) => setWifi({ ...wifi, password: val })}
                placeholder="WiFi Password"
                className="md:basis-1/2"
              />
            </div>
            <Select
              value={wifi.encryption}
              onValueChange={(val) => setWifi({ ...wifi, encryption: val })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">No password</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hidden"
                checked={wifi.hidden}
                onCheckedChange={(checked) =>
                  setWifi({ ...wifi, hidden: Boolean(checked) })
                }
              />
              <Label htmlFor="hidden">Hidden Network</Label>
            </div>
          </div>
        )}

        {qrType === "email" && (
          <div className="flex w-full flex-col gap-2">
            <div className="flex flex-col gap-2 md:flex-row">
              <InputWrapper
                value={email.to}
                onChange={(val) => setEmail({ ...email, to: val })}
                placeholder="Recipient Email"
                className="md:basis-1/2"
              />
              <InputWrapper
                value={email.subject}
                onChange={(val) => setEmail({ ...email, subject: val })}
                placeholder="Subject"
                className="md:basis-1/2"
              />
            </div>
            <InputWrapper
              value={email.body}
              onChange={(val) => setEmail({ ...email, body: val })}
              placeholder="Message Body"
              rows={6}
            />
          </div>
        )}

        {qrType === "phone" && (
          <InputWrapper
            value={phone}
            onChange={setPhone}
            placeholder="Phone number (e.g., +1234567890)"
          />
        )}

        {isValid() && (
          <div className="mt-6 flex flex-col items-center gap-4">
            <QRCodeSVG
              ref={qrRef}
              value={getQRCodeValue()}
              size={256}
              bgColor="#ffffff00"
              fgColor="var(--color-foreground)"
              level="Q"
            />
            <Button onClick={handleDownload}>Download QR Code</Button>
          </div>
        )}
      </PageWrapper>
    </>
  )
}
