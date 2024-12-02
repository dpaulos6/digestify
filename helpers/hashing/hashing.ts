import bcrypt from 'bcryptjs'
import * as crypto from 'node:crypto'
import { encoders, Whirlpool } from 'whirlpool-hash'
import {
  adler32,
  blake2b,
  blake2s,
  blake3,
  crc32,
  crc64,
  createSHA1,
  md4,
  md5,
  pbkdf2,
  scrypt,
  sha1,
  sha224,
  sha256,
  sha384,
  sha512,
  sm3,
  xxhash128,
  xxhash3,
  xxhash32,
  xxhash64
} from 'hash-wasm'
import {
  keccak224,
  keccak256,
  keccak384,
  keccak512,
  sha3_224,
  sha3_256,
  sha3_384,
  sha3_512,
  shake128,
  shake256
} from 'js-sha3'

export const hash = async (input: string, type: string): Promise<string> => {
  const plainText = input.trim()

  if (plainText === '') {
    throw new Error('Input cannot be empty')
  }

  switch (type.toLowerCase()) {
    case 'bcrypt':
      try {
        const hashedValue = await bcrypt.hash(plainText, 10)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with bcrypt:', error)
        throw error
      }

    case 'md4':
      try {
        const hash = await md4(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with MD4:', error)
        throw error
      }

    case 'md5':
      try {
        const hash = await md5(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with MD5:', error)
        throw error
      }

    case 'sha-256':
      try {
        const hash = await sha256(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA1:', error)
        throw error
      }

    case 'sha-1':
      try {
        const hash = await sha1(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA1:', error)
        throw error
      }

    case 'sha-224':
      try {
        const hash = await sha224(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA-224:', error)
        throw error
      }

    case 'sha-384':
      try {
        const hash = await sha384(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA-384:', error)
        throw error
      }

    case 'sha-512':
      try {
        const hash = await sha512(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA-512:', error)
        throw error
      }

    case 'sha3-224':
      try {
        const hash = await sha3_224(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA3-224:', error)
        throw error
      }

    case 'sha3-256':
      try {
        const hash = await sha3_256(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA3-256:', error)
        throw error
      }

    case 'sha3-384':
      try {
        const hash = await sha3_384(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA3-384:', error)
        throw error
      }

    case 'sha3-512':
      try {
        const hash = await sha3_512(input)
        return hash
      } catch (error) {
        console.error('Error while hashing with SHA3-512:', error)
        throw error
      }

    case 'ripemd-160':
      try {
        const hashRipemd160 = crypto
          .createHash('ripemd160')
          .update(plainText)
          .digest('hex')
        return hashRipemd160
      } catch (error) {
        console.error('Error while hashing with RIPEMD-160:', error)
        throw error
      }

    case 'whirlpool':
      try {
        const whirlpool = new Whirlpool()
        const hashedValue: string = whirlpool.getHash(plainText).toString()
        return encoders.toHex(hashedValue)
      } catch (error) {
        console.error('Error while hashing with Whirlpool:', error)
        throw error
      }

    case 'blake2b':
      try {
        const hashedValue = blake2b(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with Blake2b:', error)
        throw error
      }

    case 'blake2s':
      try {
        const hashedValue = blake2s(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with Blake2s:', error)
        throw error
      }

    case 'blake3':
      try {
        const hashedValue = blake3(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with Blake3:', error)
        throw error
      }

    case 'shake128':
      try {
        const hashedValue = shake128(input, 256)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with SHAKE128:', error)
        throw error
      }

    case 'shake256':
      try {
        const hashedValue = shake256(input, 512)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with SHAKE256:', error)
        throw error
      }

    case 'keccak224':
      try {
        const hashedValue = keccak224(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with KECCAK224:', error)
        throw error
      }

    case 'keccak256':
      try {
        const hashedValue = keccak256(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with KECCAK256:', error)
        throw error
      }

    case 'keccak384':
      try {
        const hashedValue = keccak384(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with KECCAK384:', error)
        throw error
      }

    case 'keccak512':
      try {
        const hashedValue = keccak512(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with KECCAK512:', error)
        throw error
      }

    case 'sm3':
      try {
        const hashedValue = sm3(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with SM3:', error)
        throw error
      }

    case 'xxhash32':
      try {
        const hashedValue = xxhash32(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with xxHash32:', error)
        throw error
      }

    case 'xxhash64':
      try {
        const hashedValue = xxhash64(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with xxHash64:', error)
        throw error
      }

    case 'xxhash128':
      try {
        const hashedValue = xxhash128(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with xxHash128:', error)
        throw error
      }

    case 'xxhash3':
      try {
        const hashedValue = xxhash3(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with xxHash3:', error)
        throw error
      }

    case 'adler-32':
      try {
        const hashedValue = adler32(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with Adler-32:', error)
        throw error
      }

    case 'crc32':
      try {
        const hashedValue = crc32(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with CRC32:', error)
        throw error
      }

    case 'crc64':
      try {
        const hashedValue = crc64(input)
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with CRC64:', error)
        throw error
      }

    case 'pbkdf2':
      try {
        const hashedValue = await pbkdf2({
          password: input,
          salt: new Uint8Array(16),
          iterations: 1000,
          hashLength: 32,
          hashFunction: createSHA1(),
          outputType: 'hex'
        })
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with PBKDF2:', error)
        throw error
      }

    case 'scrypt':
      try {
        const hashedValue = scrypt({
          password: input,
          salt: new Uint8Array(16),
          costFactor: 1024,
          blockSize: 8,
          parallelism: 1,
          hashLength: 64
        })
        return hashedValue
      } catch (error) {
        console.error('Error while hashing with scrypt:', error)
        throw error
      }

    default:
      throw new Error(`Unsupported hash type: ${type}`)
  }
}
