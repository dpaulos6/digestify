import CryptoJS from "crypto-js"

export const generateChecksum = (input: string): string =>
  CryptoJS.SHA256(input).toString(CryptoJS.enc.Hex)
