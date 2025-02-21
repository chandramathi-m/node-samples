const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();
app.use(express.json());

// Configure Session
app.use(session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use `secure: true` in production with HTTPS
}));

// Login Route - Create Session
app.post('/login', (req, res) => {
    req.session.user = { id: 1, username: "JohnDoe" };
    res.json({ message: "Logged in successfully" });
});

// Middleware to check session
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Protected Route
app.get('/protected', isAuthenticated, (req, res) => {
    res.json({ message: "Welcome to the protected page!", user: req.session.user });
});

// Logout Route - Destroy Session
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logged out successfully" });
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
