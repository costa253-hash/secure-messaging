// controllers/messageController.js
const { encryptMessage, decryptMessage } = require('../utils/encryption');

let messages = {}; // In-memory store (userId => [encryptedMessages])

// POST /messages - Encrypt message and store it
exports.storeMessage = (req, res) => {
  const { userId, message } = req.body;
  const encryptedMessage = encryptMessage(message, userId);
  
  // Add timestamp to message
  const messageWithTimestamp = {
    encryptedMessage,
    timestamp: Date.now(),
  };
  
  // Store encrypted message in memory (create array if doesn't exist)
  if (!messages[userId]) {
    messages[userId] = [];
  }
  messages[userId].push(messageWithTimestamp);
  
  res.status(201).json({ message: 'Message stored successfully', encryptedMessage });
};

// GET /messages/:userId - Retrieve and decrypt messages for the user
exports.getMessages = (req, res) => {
  const { userId } = req.params;
  
  if (!messages[userId] || messages[userId].length === 0) {
    return res.status(404).json({ error: 'No messages found for this user' });
  }

  const decryptedMessages = messages[userId].map((msg) =>
    decryptMessage(msg.encryptedMessage, userId)
  );

  res.status(200).json({ messages: decryptedMessages });
};
