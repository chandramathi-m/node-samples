const express = require('express');
const app = express();

// Middleware function
const authMiddleware = (req, res, next) => {
    console.log('req', req.headers)
    const token = req.headers.authorization;
    if (token === "VALID_TOKEN") {
        next(); // Proceed to the next middleware or route
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

// Protected route
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the protected route!" });
});

app.listen(3000, () => console.log('Server running on port 3000'));
