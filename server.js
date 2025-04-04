const express = require('express');
const bodyParser = require('body-parser');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', messageRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
