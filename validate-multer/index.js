const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.static('public'));

const storage = multer.memoryStorage();

const uploadWithValidation = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {

        // const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        // const ext = path.extname(file.originalname).toLowerCase();
        // if (allowedExtensions.includes(ext)) {

        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            console.log('file.filename', file.originalname)
            if (file.originalname.length > 5) {
                cb(null, true);
            }
        } else {
            cb(new Error('Only JPEG and PNG files are allowed'), false);
        }
    }
});

app.post('/upload-validated', uploadWithValidation.single('file'), (req, res) => {
    res.send(`Validated file uploaded: ${req.file.originalname}`);
});

app.listen(3000, () => {
    console.log("app-started validate")
})
