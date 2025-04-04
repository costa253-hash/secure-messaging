// index.js
const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Middleware
app.use(bodyParser.json()); 

// Root route to test the server is up
app.get('/', (req, res) => {
  res.send('Secure Messaging API is up and running!');
});

// Use routes defined in messageRoutes.js
app.use('/api', messageRoutes);

// Auto-delete messages after 10 minutes
setInterval(() => {
  const now = Date.now();

  // Iterate over each userId in the stored messages
  Object.keys(messages).forEach((userId) => {
    messages[userId] = messages[userId].filter((msg) => {
      const timestamp = new Date(msg.timestamp).getTime();
      return now - timestamp < 600000;
    });
  });
}, 60000);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
