"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = generatePassword;
const crypto_1 = require("crypto");
function generatePassword({ length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, easyToRead, easyToSay }) {
    let charset = '';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (includeUppercase)
        charset += uppercase;
    if (includeLowercase)
        charset += lowercase;
    if (includeNumbers)
        charset += numbers;
    if (includeSymbols)
        charset += symbols;
    const easyToReadChars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    const easyToSayChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (easyToRead)
        charset = easyToReadChars;
    if (easyToSay)
        charset = easyToSayChars;
    if (charset.length === 0) {
        throw new Error('No character sets selected');
    }
    let password = '';
    const values = new Uint32Array(length);
    (0, crypto_1.getRandomValues)(values);
    for (let i = 0; i < length; i++) {
        password += charset[values[i] % charset.length];
    }
    return password;
}
