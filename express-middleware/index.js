const express = require('express');
const morgan = require('morgan')

const router = require('./router/index.js');
const app = express();

//morgan
app.use(morgan('dev'));

//buid in middleware
app.use(express.json());
app.use(express.static('public'));

//error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const middlewareAPI = (req , res , next) =>{
    console.log("Initial call");
    next();
}

app.use(middlewareAPI())

function checkIn () {

}

// custom middleware
// app.use((req, res, next) => {
//     console.log("middleware 1");
//     const { name } = req.body;
//     if (name === "Chandra") {
//         console.log("Success")
//         next();
//     }
//     else{
//         res.statusCode = 404;
//         res.send("Error")
//     }
// })

app.use(router);

app.listen(3000, () => {
    console.log('express middleware app started');
});