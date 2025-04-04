// utils/encryption.js
const crypto = require('crypto');

// Pad or truncate the userId to ensure it's 32 bytes long
function padUserId(userId) {
  const buffer = Buffer.from(userId, 'utf8');
  if (buffer.length > 32) {
    return buffer.slice(0, 32); 
  } else if (buffer.length < 32) {
    const paddedBuffer = Buffer.alloc(32);
    buffer.copy(paddedBuffer);
    return paddedBuffer; 
  }
  return buffer;
}

// Encryption
function encryptMessage(message, userId) {
  const iv = crypto.randomBytes(16); 
  const key = padUserId(userId); 
  
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(message, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  return `${iv.toString('base64')}:${encrypted}`;
}

function decryptMessage(encryptedMessage, userId) {
  const [ivBase64, encryptedText] = encryptedMessage.split(':');
  const iv = Buffer.from(ivBase64, 'base64');
  const key = padUserId(userId); 

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = { encryptMessage, decryptMessage };
