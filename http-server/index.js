// Import the module
// http -> createdthe http server , Its returns an object 
//         It handles the http req and response 
// reuire -> import http modules 

const http = require('http');

// http.createServer -> Its a method to create a server 
//                      It holds an one callbaack function , this function contains the two paramaeter (req & res )
//                      req -> it talks about the request like url , method and body 
//                      res -> it return the response to the client 
//                         res.statusCode = 200 -> it set the status as200 (successful)
//                         res.setHeader() -> it sets the content type header as plain in the res

const server = http.createServer((req , res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    // res.statusMessage("Req Successful");
    res.end('Welcome HTTP');
})

// make the server start and listen the port for handle http http.request

server.listen(3000,()=>{
    console.log("start server")
})