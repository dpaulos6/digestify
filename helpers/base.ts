import { Buffer } from 'buffer'
import base32 from 'base32.js'
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
  const encoder = new base32.Encoder()
  return encoder.write(input).finalize()
}

export const decodeBase32 = (input: string) => {
  const decoder = new base32.Decoder()
  return decoder.write(input).finalize()
}

// Base58
export const encodeBase58 = (input: string) => {
  return bs58.encode(Buffer.from(input))
}

export const decodeBase58 = (input: string) => {
  return bs58.decode(input).toString()
}
