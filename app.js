// Load environment variables from .env file
require('dotenv').config();

const express = require('./backend/express'); // Require your express.js logic

// Start the server on the port specified in .env or default to 3000
const PORT = process.env.PORT || 3000;
express.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
