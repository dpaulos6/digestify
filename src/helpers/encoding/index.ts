import bs58 from "bs58"
import { Buffer } from "buffer"
import base32 from "hi-base32"

// Base64
export const encodeBase64 = (input: string) =>
  Buffer.from(input).toString("base64")

export const decodeBase64 = (input: string) =>
  Buffer.from(input, "base64").toString("utf8")

// Base32
export const encodeBase32 = (input: string) => base32.encode(input)

export const decodeBase32 = (input: string) => base32.decode(input)

// Base58
export const encodeBase58 = (input: string) => {
  const encoder = new TextEncoder()
  const encodedBytes = encoder.encode(input)
  const buffer = Buffer.from(encodedBytes)
  return bs58.encode(buffer)
}

export const decodeBase58 = (input: string) => {
  const decodedBuffer = bs58.decode(input)
  const decoder = new TextDecoder()
  return decoder.decode(decodedBuffer)
}
