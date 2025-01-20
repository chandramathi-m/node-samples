const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Welcome Express")
})

app.listen(4000 , ()=>{
    console.log('start server at 4000')
})