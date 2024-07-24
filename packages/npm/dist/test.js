"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const keygen_1 = require("./helpers/keygen");
const encoding_1 = require("./helpers/encoding");
const hashing_1 = require("./helpers/hashing");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Keygen
        console.log(`Secret 32 chars: ${(0, keygen_1.generateRandomSecret)(32)}`);
        console.log(`Password 16 chars: ${(0, keygen_1.generatePassword)({ length: 16, includeLowercase: true, includeUppercase: true, includeNumbers: true, includeSymbols: true })}`);
        console.log(`UUID: ${(0, keygen_1.generateUuid)()}\n`);
        console.log(`AES Key 32 chars: ${(0, keygen_1.generateAESKey)(32)}`);
        const keys = yield (0, keygen_1.generateRSAKeyPair)();
        console.log(`RSA public key:\n ${keys.publicKey}`);
        console.log(`RSA private key:\n ${keys.privateKey}`);
        // Encoding
        const encodeTxt = 'digestify';
        const encoded32 = (0, encoding_1.encodeBase32)(encodeTxt);
        const decoded32 = (0, encoding_1.decodeBase32)(encoded32);
        const encoded64 = (0, encoding_1.encodeBase64)(encodeTxt);
        const decoded64 = (0, encoding_1.decodeBase64)(encoded64);
        const encoded58 = (0, encoding_1.encodeBase58)(encodeTxt);
        const decoded58 = (0, encoding_1.decodeBase58)(encoded58);
        console.log(`Encode32 '${encodeTxt}': ${encoded32}`);
        console.log(`Decode32 '${encoded32}': ${decoded32}`);
        console.log(`Encode64 '${encodeTxt}': ${encoded64}`);
        console.log(`Decode64 '${encoded64}': ${decoded64}`);
        console.log(`Encode58 '${encodeTxt}': ${encoded58}`);
        console.log(`Decode58 '${encoded58}': ${decoded58}\n`);
        // Hashing
        const hashTxt = 'digestify is a cool library!';
        console.log(`Hashed '${hashTxt}' using 'bcrypt': ${yield (0, hashing_1.hash)(hashTxt.trim(), 'bcrypt')}`);
        console.log(`Hashed '${hashTxt}' using 'sha512': ${yield (0, hashing_1.hash)(hashTxt.trim(), 'sha-512')}`);
        console.log(`Hashed '${hashTxt}' using 'md4': ${yield (0, hashing_1.hash)(hashTxt.trim(), 'md4')}`);
        console.log(`Hashed '${hashTxt}' using 'xxHash32': ${yield (0, hashing_1.hash)(hashTxt.trim(), 'xxHash32')}`);
        console.log(`Hashed '${hashTxt}' using 'ripemd-160': ${yield (0, hashing_1.hash)(hashTxt.trim(), 'ripemd-160')}`);
    });
}
main().catch(console.error);
