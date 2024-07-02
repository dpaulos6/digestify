## Digestify: Hashing and Cryptographic Tools Suite

Welcome to **Digestify**! This web application provides a comprehensive set of tools for hashing, encryption, key generation, and more. Whether you're a developer, security enthusiast, or just need to ensure data integrity, Digestify offers a variety of features to meet your needs.

### Getting Started

First, install the modules and dependencies:

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

That's it! You're ready to start editing and making changes.

<!--

### Features

#### String Hashing

- **Basic String Hashing:** Hash any string using algorithms like MD5, SHA-1, SHA-256, SHA-512, etc.
- **Multi-Hashing:** Generate multiple hashes of the same input string simultaneously with different algorithms.
- **HMAC:** Create HMACs using different hashing algorithms and a secret key.

#### File Hashing

- **File Integrity Check:** Upload a file and generate its hash for integrity verification using MD5, SHA-256, etc.
- **Batch File Hashing:** Upload multiple files and generate their hashes at once.
- **Checksum Verification:** Compare a file's hash with a provided checksum to verify its integrity.

#### Secret and Key Generation

- **Random Secret Generator:** Generate random strings with customizable lengths and character sets.
- **UUID Generator:** Generate Universally Unique Identifiers (UUIDs).
- **Cryptographic Key Generator:** Create keys for symmetric (AES) and asymmetric (RSA, ECC) encryption.
- **Password Generator:** Generate secure, random passwords with customizable options.

#### Encryption and Decryption Tools

- **Symmetric Encryption/Decryption:** Encrypt and decrypt text and files using AES, DES, Blowfish, etc.
- **Asymmetric Encryption/Decryption:** Generate RSA and ECC key pairs, encrypt, and decrypt messages.

#### Encoding and Decoding Tools

- **Base Encoding/Decoding:** Encode and decode text and files in Base64, Base32, and Base58.
- **URL Encoding/Decoding:** Convert text to and from URL-encoded format.

#### Utilities and Miscellaneous Tools

- **Hash Comparison:** Compare two hashes to check for equality.
- **Hash Cracking:** Attempt to crack hashes using brute force or dictionary attacks (for educational purposes).
- **TOTP Generator:** Generate time-based one-time passwords for two-factor authentication (2FA).
- **Checksum Generation and Verification:** Create and verify checksums for data integrity.

#### Educational Resources

- **Algorithm Explanations:** Tutorials and guides on various hashing algorithms.
- **Security Best Practices:** Articles and tips on secure cryptographic tool usage.
- **Interactive Demos:** Visualizations of how different hashing algorithms process data.

#### User Interface and Experience Enhancements

- **Dark Mode:** Toggle between light and dark themes.
- **Clipboard Integration:** Easily copy generated outputs to the clipboard.
- **Download Options:** Download generated hashes, keys, secrets, or encrypted files.
- **Mobile Responsiveness:** Mobile-friendly design for various screen sizes.

#### Advanced Tools

- **Blockchain Tools:** Explore the use of hashes in blockchain technology.
- **Digital Signatures:** Create and verify digital signatures using public/private keys.

Explore Digestify and enhance your cryptographic operations with ease!
