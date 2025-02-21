const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'chandramathi.m@mitrahsoft.com',
        pass: process.env.MY_PASS_KEY
    }
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const emails = ['chandramathim5172@gmail.com', 'vigneshkumar.r@mitrahsoft.com', 'kamesh.a@mitrahsoft.com'];

const sendMultipleEmails = async () => {
    const sendPromises = emails.map(email => {
        return transporter.sendMail({
            from: 'chandramathi.m@mitrahsoft.com',
            to: email,
            subject: 'Happiest Day',
            text: 'Happiest Day',
            attachments: [
                {
                    path: "images/cake.jpg"
                },
            ]
        });
    });

    await Promise.all(sendPromises);
};

sendMultipleEmails();

const mailOptions = {
    from: 'chandramathi.m@mitrahsoft.com',
    to: ['chandramathim5172@gmail.com', 'vigneshkumar.r@mitrahsoft.com', 'kamesh.a@mitrahsoft.com'],
    cc: 'chandramathim5172@gmail.com',
    bcc : 'venkatesh.h@mitrahsoft.com',
    subject: 'Send OTP',
    text: `This is a test email sent from Chandra Muthuraj! `,
    html: `Your OTP <h1>${generateOTP()}</h1>`,
    attachments: [
        {
            filename: 'text.txt', //create new file
            content: 'Hello, GeeksforGeeks Learner!'
        },
        {
            path: "example.txt" //already exists
        },
        {
            path: "images/cake.jpg"
        },
    ]
};

transporter.verify((error, success) => {
    if (error) {
        console.log('SMTP server configuration is invalid: ', error);
    } else {
        console.log('SMTP server is ready to send emails');
    }
});


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
