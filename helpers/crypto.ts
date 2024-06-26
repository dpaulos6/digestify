import { randomBytes } from 'crypto'

export const generateRandomSecret = (length: number = 32): string => {
  const randomBytesBuffer = randomBytes(Math.ceil(length / 2))
  const randomHex = randomBytesBuffer.toString('hex')
  return randomHex.slice(0, length)
}
