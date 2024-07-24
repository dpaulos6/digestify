"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto = __importStar(require("crypto"));
const whirlpool_hash_1 = require("whirlpool-hash");
const hash_wasm_1 = require("hash-wasm");
const js_sha3_1 = require("js-sha3");
const hash = (input, type) => __awaiter(void 0, void 0, void 0, function* () {
    const plainText = input.trim();
    if (plainText === '') {
        throw new Error('Input cannot be empty');
    }
    switch (type.toLowerCase()) {
        case 'bcrypt':
            try {
                const hashedValue = yield bcryptjs_1.default.hash(plainText, 10);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with bcrypt:', error);
                throw error;
            }
        case 'md4':
            try {
                const hash = yield (0, hash_wasm_1.md4)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with MD4:', error);
                throw error;
            }
        case 'md5':
            try {
                const hash = yield (0, hash_wasm_1.md5)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with MD5:', error);
                throw error;
            }
        case 'sha-256':
            try {
                const hash = yield (0, hash_wasm_1.sha256)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA1:', error);
                throw error;
            }
        case 'sha-1':
            try {
                const hash = yield (0, hash_wasm_1.sha1)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA1:', error);
                throw error;
            }
        case 'sha-224':
            try {
                const hash = yield (0, hash_wasm_1.sha224)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA-224:', error);
                throw error;
            }
        case 'sha-384':
            try {
                const hash = yield (0, hash_wasm_1.sha384)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA-384:', error);
                throw error;
            }
        case 'sha-512':
            try {
                const hash = yield (0, hash_wasm_1.sha512)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA-512:', error);
                throw error;
            }
        case 'sha3-224':
            try {
                const hash = yield (0, js_sha3_1.sha3_224)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA3-224:', error);
                throw error;
            }
        case 'sha3-256':
            try {
                const hash = yield (0, js_sha3_1.sha3_256)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA3-256:', error);
                throw error;
            }
        case 'sha3-384':
            try {
                const hash = yield (0, js_sha3_1.sha3_384)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA3-384:', error);
                throw error;
            }
        case 'sha3-512':
            try {
                const hash = yield (0, js_sha3_1.sha3_512)(input);
                return hash;
            }
            catch (error) {
                console.error('Error while hashing with SHA3-512:', error);
                throw error;
            }
        case 'ripemd-160':
            try {
                const hashRipemd160 = crypto
                    .createHash('ripemd160')
                    .update(plainText)
                    .digest('hex');
                return hashRipemd160;
            }
            catch (error) {
                console.error('Error while hashing with RIPEMD-160:', error);
                throw error;
            }
        case 'whirlpool':
            try {
                const whirlpool = new whirlpool_hash_1.Whirlpool();
                const hashedValue = whirlpool.getHash(plainText).toString();
                return whirlpool_hash_1.encoders.toHex(hashedValue);
            }
            catch (error) {
                console.error('Error while hashing with Whirlpool:', error);
                throw error;
            }
        case 'blake2b':
            try {
                const hashedValue = (0, hash_wasm_1.blake2b)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with Blake2b:', error);
                throw error;
            }
        case 'blake2s':
            try {
                const hashedValue = (0, hash_wasm_1.blake2s)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with Blake2s:', error);
                throw error;
            }
        case 'blake3':
            try {
                const hashedValue = (0, hash_wasm_1.blake3)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with Blake3:', error);
                throw error;
            }
        case 'shake128':
            try {
                const hashedValue = (0, js_sha3_1.shake128)(input, 256);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with SHAKE128:', error);
                throw error;
            }
        case 'shake256':
            try {
                const hashedValue = (0, js_sha3_1.shake256)(input, 512);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with SHAKE256:', error);
                throw error;
            }
        case 'keccak224':
            try {
                const hashedValue = (0, js_sha3_1.keccak224)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with KECCAK224:', error);
                throw error;
            }
        case 'keccak256':
            try {
                const hashedValue = (0, js_sha3_1.keccak256)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with KECCAK256:', error);
                throw error;
            }
        case 'keccak384':
            try {
                const hashedValue = (0, js_sha3_1.keccak384)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with KECCAK384:', error);
                throw error;
            }
        case 'keccak512':
            try {
                const hashedValue = (0, js_sha3_1.keccak512)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with KECCAK512:', error);
                throw error;
            }
        case 'sm3':
            try {
                const hashedValue = (0, hash_wasm_1.sm3)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with SM3:', error);
                throw error;
            }
        case 'xxhash32':
            try {
                const hashedValue = (0, hash_wasm_1.xxhash32)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with xxHash32:', error);
                throw error;
            }
        case 'xxhash64':
            try {
                const hashedValue = (0, hash_wasm_1.xxhash64)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with xxHash64:', error);
                throw error;
            }
        case 'xxhash128':
            try {
                const hashedValue = (0, hash_wasm_1.xxhash128)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with xxHash128:', error);
                throw error;
            }
        case 'xxhash3':
            try {
                const hashedValue = (0, hash_wasm_1.xxhash3)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with xxHash3:', error);
                throw error;
            }
        case 'adler-32':
            try {
                const hashedValue = (0, hash_wasm_1.adler32)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with Adler-32:', error);
                throw error;
            }
        case 'crc32':
            try {
                const hashedValue = (0, hash_wasm_1.crc32)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with CRC32:', error);
                throw error;
            }
        case 'crc32c':
            try {
                const hashedValue = (0, hash_wasm_1.crc32c)(input);
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with CRC32C:', error);
                throw error;
            }
        case 'pbkdf2':
            try {
                const hashedValue = yield (0, hash_wasm_1.pbkdf2)({
                    password: input,
                    salt: new Uint8Array(16),
                    iterations: 1000,
                    hashLength: 32,
                    hashFunction: (0, hash_wasm_1.createSHA1)(),
                    outputType: 'hex'
                });
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with PBKDF2:', error);
                throw error;
            }
        case 'scrypt':
            try {
                const hashedValue = (0, hash_wasm_1.scrypt)({
                    password: input,
                    salt: new Uint8Array(16),
                    costFactor: 1024,
                    blockSize: 8,
                    parallelism: 1,
                    hashLength: 64
                });
                return hashedValue;
            }
            catch (error) {
                console.error('Error while hashing with scrypt:', error);
                throw error;
            }
        default:
            throw new Error(`Unsupported hash type: ${type}`);
    }
});
exports.hash = hash;
