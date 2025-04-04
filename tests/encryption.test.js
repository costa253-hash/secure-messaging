// tests/encryption.test.js
const { encryptMessage, decryptMessage } = require('../utils/encryption');

describe('Encryption and Decryption', () => {
  const userId = 'user123456789012345678901234567890'; // 32-byte user ID (exactly 32 characters)
  const message = 'This is a secret message';

  it('should encrypt and decrypt a message correctly', () => {
    const encryptedMessage = encryptMessage(message, userId);
    const decryptedMessage = decryptMessage(encryptedMessage, userId);
    
    expect(decryptedMessage).toBe(message);
  });

  it('should fail decryption with the wrong userId', () => {
    const encryptedMessage = encryptMessage(message, userId);
    const wrongUserId = 'wronguser1234567890123456789012345'; // Different 32-byte userId
    
    expect(() => {
      decryptMessage(encryptedMessage, wrongUserId);
    }).toThrow('bad decrypt'); // Expect decryption to fail
  });
});
