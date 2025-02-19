const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.static('public'))

// This configures storage for Multer.
// Uses memoryStorage(), meaning files are stored in RAM (temporary memory) instead of being saved to disk.
const storage = multer.memoryStorage();

// Initializes Multer with the defined storage.
// This allows file uploads via Multer middleware.
const upload = multer({ storage: storage });

// Define a route for file upload
// upload.array('files', 5) → Multer middleware that processes multiple file uploads.
// upload.array(fieldname , maxCount) → 
// fieldname: The name of the file input field in the HTML form (in this case, files).
// maxCount: The maximum number of files allowed to upload (in this case, 5)
// When the request is made, Multer processes the uploaded files and attaches them to req.files.

app.post('/upload-multiple', upload.array('files', 5), (req, res) => {
    res.send(`Uploaded ${req.files.map((file) => file.originalname)} files`);
});

app.listen(3000, () => {
    console.log("app listen - multiple files")
})
