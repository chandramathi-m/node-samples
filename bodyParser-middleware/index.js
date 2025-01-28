const express = require('express');
const route = require('./router.js')
const app = express();

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

const bodyParser = require('body-parser');
//Parse incoming JSON request bodies  - 
app.use(bodyParser.json());

//import router
app.use(route);

//Static Files
app.use(express.static('public'));

//  Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

//listen url
app.listen(4000, (error) => {
    if (!error)
        console.log('start server at 4000')
    else
        console.log("Error");
})