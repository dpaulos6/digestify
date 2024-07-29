import CryptoJS from 'crypto-js'

export const generateChecksum = (input: string): string => {
  return CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex)
}
