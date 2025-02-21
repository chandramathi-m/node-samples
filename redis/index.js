// Its not working because I dont have the internal redis 

const nodemailer = require('nodemailer');
const redis = require('redis');

const client = redis.createClient(); // Connect to Redis

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chandramathi.m@mitrahsoft.com',
        pass: 'lvsb immi gahn ivzm'
    }
});

// Function to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email) => {
    const otp = generateOTP();
    await client.connect();
    await client.setEx(email, 300, otp); // Store OTP in Redis for 5 minutes

    const mailOptions = {
        from: 'chandramathi.m@mitrahsoft.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Example Usage
sendOTP('chandramathim5172@gmail.com');
