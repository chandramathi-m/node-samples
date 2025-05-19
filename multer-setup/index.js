// Import necessary modules
const express = require('express');
const multer = require('multer');
const cors = require('cors')

// custom-cors
const corsOptions = {
  origin: 'http://localhost:3000',  // Only allow requests from this origin
  methods: ['GET', 'POST'],  // Allow only GET and POST methods
  allowedHeaders: ['Content-Type'],  // Allow specific headers
};

// const allowMultipleOrigin = ['http://localhost:3000', 'http://localhost:4000'];

// Create an Express app
const app = express();
app.use(express.static('public'));
// app.use(cors(corsOptions)); 
app.use(
  cors(corsOptions)
);

// Set up Multer to store the file in memory (temporary storage for simplicity)
const storage = multer.memoryStorage();  // We are storing the file in memory here.

const upload = multer({ storage: storage });  // Initialize multer with the memory storage

app.post('/upload', upload.single('file'), (req, res) => {
  console.log("req", req.file)
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // If file uploaded successfully
  res.send(`File uploaded: ${req.file.originalname}`);
});

app.get('/', (req, res) => {
  res.send("Multer Setup Successfull")
})

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
