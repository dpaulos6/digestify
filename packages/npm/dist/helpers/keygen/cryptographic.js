'use strict'
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        var desc = Object.getOwnPropertyDescriptor(m, k)
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k]
            }
          }
        }
        Object.defineProperty(o, k2, desc)
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k
        o[k2] = m[k]
      })
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v })
      }
    : function (o, v) {
        o['default'] = v
      })
var __importStar =
  (this && this.__importStar) ||
  function (mod) {
    if (mod && mod.__esModule) return mod
    var result = {}
    if (mod != null)
      for (var k in mod)
        if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k))
          __createBinding(result, mod, k)
    __setModuleDefault(result, mod)
    return result
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.generateAESKey = generateAESKey
exports.generateRSAKeyPair = generateRSAKeyPair
const CryptoJS = __importStar(require('crypto-js'))
const node_forge_1 = __importDefault(require('node-forge'))
function generateAESKey(length = 32) {
  const randomBytes = CryptoJS.lib.WordArray.random(length)
  return randomBytes.toString(CryptoJS.enc.Hex)
}
function generateRSAKeyPair() {
  return new Promise((resolve, reject) => {
    node_forge_1.default.pki.rsa.generateKeyPair(
      { bits: 2048 },
      (err, keypair) => {
        if (err) {
          reject(err)
        } else {
          const publicKey = node_forge_1.default.pki.publicKeyToPem(
            keypair.publicKey
          )
          const privateKey = node_forge_1.default.pki.privateKeyToPem(
            keypair.privateKey
          )
          resolve({ publicKey, privateKey })
        }
      }
    )
  })
}
