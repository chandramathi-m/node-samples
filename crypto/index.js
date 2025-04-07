const crypto = require('crypto');

const password = 'crypto@123';
const algorithm = 'aes-128-cbc';
const key = crypto.randomBytes(16); // 16 bytes for AES-128
const iv = crypto.randomBytes(16);  // IV (must be 16 bytes)

const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update(password, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('Encrypted:', encrypted);
console.log('Key:', key.toString('hex')); // Save this for decryption
console.log('IV:', iv.toString('hex'));   // Save this for decryption
