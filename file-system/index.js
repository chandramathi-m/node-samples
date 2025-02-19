const express = require('express');
const app = express();

const fs = require('fs');

// Write a file
fs.writeFileSync('example.txt', 'Hello, Node.js!');

//read file
const content = fs.readFileSync('example.txt', 'utf8');
console.log(content);

// Append to a file
fs.appendFileSync('example.txt', '\nNew data added!');

//read file
const content1 = fs.readFileSync('example.txt', 'utf8');
console.log(content1);

//delete file
// fs.unlinkSync('example.txt')

app.listen(3000, () => {
    console.log("Listen port 3000 -- file system");

})