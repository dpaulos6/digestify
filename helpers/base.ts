import { Buffer } from 'buffer'
import base32 from 'hi-base32'
import bs58 from 'bs58'

// Base64
export const encodeBase64 = (input: string) => {
  return Buffer.from(input).toString('base64')
}

export const decodeBase64 = (input: string) => {
  return Buffer.from(input, 'base64').toString('utf8')
}

// Base32
export const encodeBase32 = (input: string) => {
  return base32.encode(input)
}

export const decodeBase32 = (input: string) => {
  return base32.decode(input)
}

// Base58
export const encodeBase58 = (input: string) => {
  const encoder = new TextEncoder()
  const Uint8Array = encoder.encode(input)
  const buffer = Buffer.from(Uint8Array)
  return bs58.encode(buffer)
}

export const decodeBase58 = (input: string) => {
  const decodedBuffer = bs58.decode(input)
  const decoder = new TextDecoder()
  return decoder.decode(decodedBuffer)
}
