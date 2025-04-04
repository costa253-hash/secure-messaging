const express = require('express');
const router = express.Router();
const { encryptMessage, decryptMessage } = require('../utils/encryption');
const authenticate = require('../middleware/auth');

let messages = {}; // Store messages in memory

// POST /messages - Encrypt and store a message
router.post('/messages', authenticate, (req, res) => {
  const { message } = req.body;
  const userId = req.userId;
  
  const encryptedMessage = encryptMessage(message, userId);
  
  if (!messages[userId]) {
    messages[userId] = [];
  }

  messages[userId].push({ message: encryptedMessage, timestamp: Date.now() });
  
  res.status(200).json({ message: 'Message encrypted and stored successfully' });
});

// GET /messages/:userId - Decrypt and return all messages for the authenticated user
router.get('/messages/:userId', authenticate, (req, res) => {
  const { userId } = req.params;

  if (req.userId !== userId) {
    return res.status(403).json({ message: 'You can only access your own messages' });
  }

  if (!messages[userId]) {
    return res.status(404).json({ message: 'No messages found for this user' });
  }

  const decryptedMessages = messages[userId].map(msg => {
    return {
      message: decryptMessage(msg.message, userId),
      timestamp: msg.timestamp,
    };
  });

  res.status(200).json(decryptedMessages);
});

module.exports = router;
