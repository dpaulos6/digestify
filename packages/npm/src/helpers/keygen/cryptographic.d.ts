import type { KeyPair } from './interfaces'
export declare function generateAESKey(length?: number): string
export declare function generateRSAKeyPair(): Promise<KeyPair>
