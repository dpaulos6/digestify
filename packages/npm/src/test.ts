import {
  generateRandomSecret,
  generateAESKey,
  generatePassword,
  generateRSAKeyPair,
  generateUuid,
  KeyPair
} from './helpers/keygen'
import {
  encodeBase32,
  encodeBase58,
  encodeBase64,
  decodeBase32,
  decodeBase58,
  decodeBase64
} from './helpers/encoding'
import { hash } from './helpers/hashing'

async function main() {
  // Keygen
  console.log(`Secret 32 chars: ${generateRandomSecret(32)}`)
  console.log(
    `Password 16 chars: ${generatePassword({ length: 16, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true })}`
  )
  console.log(`UUID: ${generateUuid()}\n`)
  console.log(`AES Key 32 chars: ${generateAESKey(32)}`)
  const keys: KeyPair = await generateRSAKeyPair()
  console.log(`RSA public key:\n ${keys.publicKey}`)
  console.log(`RSA private key:\n ${keys.privateKey}`)

  // Encoding
  const encodeTxt = 'digestify'
  const encoded32 = encodeBase32(encodeTxt)
  const decoded32 = decodeBase32(encoded32)
  const encoded64 = encodeBase64(encodeTxt)
  const decoded64 = decodeBase64(encoded64)
  const encoded58 = encodeBase58(encodeTxt)
  const decoded58 = decodeBase58(encoded58)

  console.log(`Encode32 '${encodeTxt}': ${encoded32}`)
  console.log(`Decode32 '${encoded32}': ${decoded32}`)
  console.log(`Encode64 '${encodeTxt}': ${encoded64}`)
  console.log(`Decode64 '${encoded64}': ${decoded64}`)
  console.log(`Encode58 '${encodeTxt}': ${encoded58}`)
  console.log(`Decode58 '${encoded58}': ${decoded58}\n`)

  // Hashing
  const hashTxt = 'digestify is a cool library!'
  console.log(
    `Hashed '${hashTxt}' using 'bcrypt': ${await hash(hashTxt.trim(), 'bcrypt')}`
  )
  console.log(
    `Hashed '${hashTxt}' using 'sha512': ${await hash(hashTxt.trim(), 'sha-512')}`
  )
  console.log(
    `Hashed '${hashTxt}' using 'md4': ${await hash(hashTxt.trim(), 'md4')}`
  )
  console.log(
    `Hashed '${hashTxt}' using 'xxHash32': ${await hash(hashTxt.trim(), 'xxHash32')}`
  )
  console.log(
    `Hashed '${hashTxt}' using 'ripemd-160': ${await hash(hashTxt.trim(), 'ripemd-160')}`
  )
}

main().catch(console.error)
