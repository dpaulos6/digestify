'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.decodeBase58 =
  exports.encodeBase58 =
  exports.decodeBase32 =
  exports.encodeBase32 =
  exports.decodeBase64 =
  exports.encodeBase64 =
    void 0
const buffer_1 = require('buffer')
const hi_base32_1 = __importDefault(require('hi-base32'))
const bs58_1 = __importDefault(require('bs58'))
// Base64
const encodeBase64 = (input) => {
  return buffer_1.Buffer.from(input).toString('base64')
}
exports.encodeBase64 = encodeBase64
const decodeBase64 = (input) => {
  return buffer_1.Buffer.from(input, 'base64').toString('utf8')
}
exports.decodeBase64 = decodeBase64
// Base32
const encodeBase32 = (input) => {
  return hi_base32_1.default.encode(input)
}
exports.encodeBase32 = encodeBase32
const decodeBase32 = (input) => {
  return hi_base32_1.default.decode(input)
}
exports.decodeBase32 = decodeBase32
// Base58
const encodeBase58 = (input) => {
  const encoder = new TextEncoder()
  const Uint8Array = encoder.encode(input)
  const buffer = buffer_1.Buffer.from(Uint8Array)
  return bs58_1.default.encode(buffer)
}
exports.encodeBase58 = encodeBase58
const decodeBase58 = (input) => {
  const decodedBuffer = bs58_1.default.decode(input)
  const decoder = new TextDecoder()
  return decoder.decode(decodedBuffer)
}
exports.decodeBase58 = decodeBase58
