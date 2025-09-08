// server.js
const path = require('path');
const express = require('express');
const { PORT } = require('./config.js');

const app = express();

// Serve static files from wwwroot
app.use(express.static(path.join(__dirname, 'wwwroot')));

// API routes
app.use(require('./routes/auth.js'));
app.use(require('./routes/models.js'));

// Serve index.html for the root (and optionally for any other non-API paths)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'wwwroot', 'index.html'));
});

// Only start a local server in dev
if (require.main === module) {
  app.listen(PORT || 8080, () =>
    console.log(`Server listening on port ${PORT || 8080}...`)
  );
}

// Export the app for Vercel
module.exports = app;
