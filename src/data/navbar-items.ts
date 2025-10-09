import { Braces, FileKey, FileLock, Hash, KeyRound, QrCode } from "lucide-react"

export const navbarItems = [
  {
    title: "Hashing Tools",
    href: "/hashing",
    description:
      "Hash text and files with various algorithms like MD5, SHA-256, and more.",
    icon: Hash
  },
  {
    title: "Key Generation",
    href: "/keygen",
    description:
      "Generate secure UUIDs and secrets for any application or need.",
    icon: KeyRound
  },
  {
    title: "Encryption & Decryption",
    href: "/encryption",
    description:
      "Encrypt and decrypt text and files using robust symmetric algorithms.",
    icon: FileLock
  },
  {
    title: "Encoding & Decoding",
    href: "/encoding",
    description:
      "Efficiently encode and decode text and files in formats like Base64 and Base32.",
    icon: FileKey
  },
  {
    title: "JSON Tools",
    href: "/json",
    description: "Tools for JSON manipulation, beautification, and validation.",
    icon: Braces
  },
  {
    title: "Code Generators",
    href: "/code-generators",
    description:
      "Generate QR codes, barcodes, and other scannable formats quickly. Perfect for links, product labels, IDs, and more.",
    icon: QrCode
  }
  // {
  //   title: 'Miscellaneous',
  //   href: '/miscellaneous',
  //   description:
  //     'Tools for hash comparison, cracking, one-time passwords generation, and more.',
  //   icon: Component
  // }
  // {
  //   title: 'Educational Resources',
  //   href: '/education',
  //   description:
  //     'Guides and explanations to enhance your understanding of security practices.',
  //   icon: GraduationCap
  // }
]
