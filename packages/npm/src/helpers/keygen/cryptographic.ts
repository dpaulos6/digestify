import * as CryptoJS from 'crypto-js'
import forge from 'node-forge'
import type { KeyPair } from './interfaces'

export function generateAESKey(length = 32): string {
  const randomBytes = CryptoJS.lib.WordArray.random(length)
  return randomBytes.toString(CryptoJS.enc.Hex)
}

export function generateRSAKeyPair(): Promise<KeyPair> {
  return new Promise((resolve, reject) => {
    forge.pki.rsa.generateKeyPair({ bits: 2048 }, (err, keypair) => {
      if (err) {
        reject(err)
      } else {
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey)
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey)
        resolve({ publicKey, privateKey })
      }
    })
  })
}
