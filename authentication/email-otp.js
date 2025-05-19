const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require('dotenv').config()

const app = express();
app.use(express.json());

let otpStorage = {}; // Temporary storage for OTPs

// Configure Nodemailer (Use your SMTP details)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chandramathi.m@mitrahsoft.com",
        pass: process.env.MY_PASS_KEY
    }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Generate & Send OTP
app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    // const otp = crypto.randomInt(100000, 999999); // 6-digit OTP
    const otp = generateOTP();
    otpStorage[email] = otp; // Store OTP temporarily

    // Send OTP via Email
    await transporter.sendMail({
        from: "chandramathi.m@mitrahsoft.com",
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is ${otp}.`
    });

    res.json({ message: "OTP sent successfully!" });
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    if (otpStorage[email] && otpStorage[otp] == otp) {
        delete otpStorage[email]; // OTP used, remove it
        return res.json({ success: true, message: "OTP verified!" });
    }

    return res.status(401).json({ success: false, message: "Invalid OTP" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
