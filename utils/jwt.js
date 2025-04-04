const jwt = require('jsonwebtoken');

const secretKey = 'yourSecretKey'; 

// Function to sign a token
function generateToken(userId) {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
}

// Function to verify a token
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null; 
  }
}

module.exports = { generateToken, verifyToken };
