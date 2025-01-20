const express = require('express');
const app = express();

app.use(express.raw());

app.get('/',(req,res)=>{
    res.statusCode = 200;
    res.send("Welcome Express")
})

app.post('/', (req, res)=>{
    console.log("check post",req.body)
    const {name} = req.body;
    
    res.send(`Welcome ${name}`);
})

app.delete('/', (req, res)=>{
    const {name} = req.body;
    console.log('req', req)
    res.send(`Deleted user successfully ${name}`);
})

app.listen(4000 , ()=>{
    console.log('start server at 4000')
})