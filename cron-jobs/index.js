const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "chandramathi.m@mitrahsoft.com",
        pass: process.env.MY_PASS_KEY
    }
})

const mailOptions = {
    from: "chandramathi.m@mitrahsoft.com",
    to: "chandramathim5172@gmail.com",
    cc: "vigneshkumar.r@mitrahsoft.com",
    subject: "Happty day",
    text: "Good Morning to all",
    attachments: [
        {
            path: "images/cake.jpg"
        }
    ],
    html: `<h1>Hey Guys , This is greetings from Chandra muthuraj</h1>`
}


cron.schedule('*/1 * * * *', () => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log('err', err)
        }
        else {
            console.log('info', info)
        }
    })
});

cron.schedule('30 9 * * *', () => {
    console.log('Running job at 9:30 AM every day');
});
