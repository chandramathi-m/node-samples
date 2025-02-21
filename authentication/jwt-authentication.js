const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.MY_SECRET_KEY;

// Login Route - Generate JWT Token
app.post('/login', (req, res) => {
    const user = {
        id: req.id,
        name: req.name
    };
    const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' , noTimestamp: false });
    res.json({ token });
});

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Access Denied" });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        req.user = decoded;
        next();
    });
};

// Protected Route
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: "You have accessed a protected route", user: req.user });
});

app.listen(3000, () => console.log("Server running on port 3000"));
