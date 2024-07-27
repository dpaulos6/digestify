"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomSecret = void 0;
const crypto_1 = require("crypto");
const generateRandomSecret = (length) => {
    const randomBytesBuffer = (0, crypto_1.randomBytes)(Math.ceil(length / 2));
    const randomHex = randomBytesBuffer.toString('hex');
    return randomHex.slice(0, length);
};
exports.generateRandomSecret = generateRandomSecret;
