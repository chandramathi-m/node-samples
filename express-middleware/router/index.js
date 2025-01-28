const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Welcome my own appp");
});

router.post('/', (req, res) => {
    const { name } = req?.body;
    console.log('name', name);
    res.send(`Welcome ${name}`);
});

module.exports = router;