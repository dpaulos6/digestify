import bcrypt from "bcryptjs"
import { createHash } from "crypto"
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
  xxhash3,
  xxhash32,
  xxhash64,
  xxhash128
} from "hash-wasm"
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
} from "js-sha3"
import { encoders, Whirlpool } from "whirlpool-hash"

type HashHandler = (input: string) => Promise<string> | string

const NUMBER_16 = 16
const NUMBER_256 = 256
const NUMBER_512 = 512

const hashHandlers: Record<string, HashHandler> = {
  bcrypt: async (input: string) => await bcrypt.hash(input.trim(), 10),
  md4: async (input: string) => await md4(input),
  md5: async (input: string) => await md5(input),
  "sha-256": async (input: string) => await sha256(input),
  "sha-1": async (input: string) => await sha1(input),
  "sha-224": async (input: string) => await sha224(input),
  "sha-384": async (input: string) => await sha384(input),
  "sha-512": async (input: string) => await sha512(input),
  "sha3-224": async (input: string) => await sha3_224(input),
  "sha3-256": async (input: string) => await sha3_256(input),
  "sha3-384": async (input: string) => await sha3_384(input),
  "sha3-512": async (input: string) => await sha3_512(input),
  "ripemd-160": (input: string) =>
    createHash("ripemd160").update(input.trim()).digest("hex"),
  whirlpool: (input: string) => {
    const whirlpool = new Whirlpool()
    const hashedValue: string = whirlpool.getHash(input.trim()).toString()
    return encoders.toHex(hashedValue)
  },
  blake2b: (input: string) => blake2b(input),
  blake2s: (input: string) => blake2s(input),
  blake3: (input: string) => blake3(input),
  shake128: (input: string) => shake128(input, NUMBER_256),
  shake256: (input: string) => shake256(input, NUMBER_512),
  keccak224: (input: string) => keccak224(input),
  keccak256: (input: string) => keccak256(input),
  keccak384: (input: string) => keccak384(input),
  keccak512: (input: string) => keccak512(input),
  sm3: (input: string) => sm3(input),
  xxhash32: (input: string) => xxhash32(input),
  xxhash64: (input: string) => xxhash64(input),
  xxhash128: (input: string) => xxhash128(input),
  xxhash3: (input: string) => xxhash3(input),
  "adler-32": (input: string) => adler32(input),
  crc32: (input: string) => crc32(input),
  crc64: (input: string) => crc64(input),
  pbkdf2: async (input: string) =>
    await pbkdf2({
      password: input,
      salt: new Uint8Array(NUMBER_16),
      iterations: 1000,
      hashLength: 32,
      hashFunction: createSHA1(),
      outputType: "hex"
    }),
  scrypt: (input: string) =>
    scrypt({
      password: input,
      salt: new Uint8Array(NUMBER_16),
      costFactor: 1024,
      blockSize: 8,
      parallelism: 1,
      hashLength: 64
    })
}

export const hash = async (input: string, type: string): Promise<string> => {
  const plainText = input.trim()
  if (plainText === "") {
    throw new Error("Input cannot be empty")
  }
  const handler = hashHandlers[type.toLowerCase()]
  if (!handler) {
    throw new Error(`Unsupported hash type: ${type}`)
  }
  try {
    const result = await handler(input)
    return result
  } catch (error) {
    throw new Error(
      `Error while hashing with ${type}: ${(error as Error).message}`
    )
  }
}
