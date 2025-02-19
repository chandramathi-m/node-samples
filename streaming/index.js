const express = require('express');
const multer = require('multer');
const { Readable } = require('stream');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

let uploadedFile = null;

app.use(express.static('public'));

// Upload file
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) return res.status(400).send('No file uploaded.');

    uploadedFile = req.file; // Store file temporarily
    res.send(`Uploaded: ${req.file.originalname}`);
});

// Stream file in chunks
app.get('/download', (req, res) => {
    if (!uploadedFile) return res.status(404).send('No file available.');

    res.setHeader('Content-Type', uploadedFile.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename=${uploadedFile.originalname}`);

    const CHUNK_SIZE = 64 * 1024; // 64 KB per chunk
    let offset = 0;

    //automati chunck
    // const stream = Readable.from(uploadedFile.buffer);
    // stream.pipe(res);

    //manual chunck
    const readableStream = new Readable({
        read() {
            if (offset < uploadedFile.buffer.length) {
                const chunk = uploadedFile.buffer.slice(offset, offset + CHUNK_SIZE);
                offset += CHUNK_SIZE;
                this.push(chunk);
            } else {
                this.push(null); // End stream when all data is sent
            }
        }
    });

    readableStream.pipe(res);
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
