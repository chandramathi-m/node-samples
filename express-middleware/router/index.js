const express = require('express');
const router = express.Router();

const myMiddleware = (req, res, next) => {
    console.log('Middleware executed');
    next();
};

router.get('/home', myMiddleware, (req, res) => {
    res.send('Hello from /home');
});

router.post('/', (req, res) => {
    const { name } = req?.body;
    console.log('name', name);
    res.send(`Welcome ${name}`);
});

module.exports = router;