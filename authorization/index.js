const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.MY_SECRET_KEY;

// Dummy Users Data
const users = [
    { id: 1, username: "adminUser", role: "admin" },
    { id: 2, username: "normalUser", role: "user" }
];

// Login Route - Generate JWT Token with Role
app.post("/login", (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ error: "User not found" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Middleware to Verify JWT Token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid Token" });
        req.user = decoded;
        next();
    });
};

// Middleware to Check Role
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ error: "Forbidden: You do not have access" });
        }
        next();
    };
};

// Protected Routes with Role-Based Access
app.get("/admin", verifyToken, checkRole("admin"), (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

app.get("/user", verifyToken, (req, res) => {
    res.json({ message: "Welcome, User!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
