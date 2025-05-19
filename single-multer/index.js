// Single File Upload

// multer → Middleware for handling file uploads in Node.js.
// express → Web framework to handle HTTP requests.
const multer = require('multer');

const express = require('express');
const app = express();

// Serves static files from the public directory.
// This is useful if you have an HTML form (index.html) to upload files.
app.use(express.static('public'));

// This configures storage for Multer.
// Uses memoryStorage(), meaning files are stored in RAM (temporary memory) instead of being saved to disk.
const storage = multer.memoryStorage();

// Initializes Multer with the defined storage.
// This allows file uploads via Multer middleware.
const upload = multer({ storage: storage });

// Define a route for file upload
// upload.single('file') → Handles one file at a time (expects an input field named file).
app.post('/upload', upload.single('file'), (req, res) => {
  console.log('req.file', req.file)
  res.send(`File uploaded: ${req.file.originalname}`);
});

// Start the server
app.listen(3000, () => console.log('Server running on port 3000'));