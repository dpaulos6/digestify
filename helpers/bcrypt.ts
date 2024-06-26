import bcrypt from 'bcryptjs'
import copy from 'copy-to-clipboard'

export const digest = async (input: string): Promise<string> => {
  const plainText = input.trim()

  if (plainText === '') {
    return ''
  }

  try {
    const hashedValue = await bcrypt.hash(plainText, 10)
    return hashedValue
  } catch (error) {
    console.error('Error while hashing:', error)
    throw error
  }
}
