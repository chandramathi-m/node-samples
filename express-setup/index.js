const express = require('express');
const route = require('./router.js')
const app = express();

//express.json() is a built-in middleware function in Express.js that parses incoming JSON request bodies. It allows your Express app to automatically handle requests with Content-Type: application/json, converting the JSON payload into a JavaScript object accessible via req.body.

//normal middleware
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

//error handling - customize
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

//Parse incoming JSON request bodies  - Built-in Middleware
app.use(express.json());

//import router
app.use(route);

//Static Files
app.use(express.static('public'));

// Built-in Middleware: Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

//listen url
app.listen(4000, (error) => {
    if (!error)
        console.log('start server at 4000')
    else
        console.log("Error");
})
