declare module 'base32.js' {
  export class Encoder {
    write(input: string): Encoder
    finalize(): string
  }

  export class Decoder {
    write(input: string): Decoder
    finalize(): string
  }
}
