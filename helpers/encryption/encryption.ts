import crypto from 'crypto'
import CryptoJS from 'crypto-js'

const AES_KEY = Buffer.from(
  '9706318f249c62668c37e05e21983ff5a346006739300c8963f4e4f7fbe9d24f',
  'hex'
)
const AES_IV = Buffer.from('e1921eabb0dc5da4f89847c842624ccf', 'hex')

// AES Encryption
export function encryptTextAES(text: string): string {
  const cipher = crypto.createCipheriv('aes-256-cbc', AES_KEY, AES_IV)
  let encrypted = cipher.update(text, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return encrypted
}

// AES Decryption
export function decryptTextAES(encryptedText: string): string {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AES_KEY, AES_IV)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

const BLOWFISH_KEY = '776f54e445c35295c5581d84257b10d8'

export function encryptTextBlowfish(text: string): string {
  return CryptoJS.Blowfish.encrypt(text, BLOWFISH_KEY).toString()
}

export function decryptTextBlowfish(encryptedText: string): string {
  const bytes = CryptoJS.Blowfish.decrypt(encryptedText, BLOWFISH_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}
