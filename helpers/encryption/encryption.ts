// utils/encryption.ts
import crypto from 'crypto'
import CryptoJS from 'crypto-js'

const AES_KEY = crypto.randomBytes(32)
const AES_IV = crypto.randomBytes(16)

// AES Encryption
export function encryptTextAES(text: string): {
  iv: string
  encryptedData: string
} {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Uint8Array.from(AES_KEY),
    Uint8Array.from(AES_IV)
  )
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { iv: AES_IV.toString('hex'), encryptedData: encrypted }
}

// AES Decryption
export function decryptTextAES(encrypted: {
  iv: string
  encryptedData: string
}): string {
  const decipher = crypto.createDecipher(
    'aes-256-cbc',
    Uint8Array.from(AES_KEY),
    Buffer.from(encrypted.iv, 'hex')
  )
  let decrypted = decipher.update(encrypted.encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

// Blowfish Encryption
export function encryptTextBlowfish(text: string): string {
  return CryptoJS.Blowfish.encrypt(text, AES_KEY.toString('hex')).toString()
}

// Blowfish Decryption
export function decryptTextBlowfish(encryptedText: string): string {
  const bytes = CryptoJS.Blowfish.decrypt(
    encryptedText,
    AES_KEY.toString('hex')
  )
  return bytes.toString(CryptoJS.enc.Utf8)
}
