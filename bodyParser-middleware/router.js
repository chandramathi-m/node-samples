const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.send("Welcome Express")
})

router.post('/', (req, res) => {
    console.log("check post", req.body)
    const { name } = req.body;

    res.send(`Welcome ${name}`);
})

router.post('/submit', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ message: `Hello, ${req.body.name}!` });
});

//both params & body
router.delete('/user/:name', (req, res) => {
    const { name } = req.params;
    console.log('req params:', req.params);
    console.log('req bofy:', req.body);
    res.send(`Deleted user successfully ${name}`);
});

module.exports = router;
