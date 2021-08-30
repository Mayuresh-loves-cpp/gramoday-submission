/**
 *  Gramoday Submission, By - Mayuresh Shinde
 */

// imports
const express = require('express');
const app = express();
require('dotenv').config();
require('./api/utils/initDB');

// consts
const port = process.env.PORT || 5000;

// using some middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// main routes
const api = require('./api/routes/main_api');

// using routes
app.use('/api', api);

// running server and listening queries
app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("running on port number:", port);
    }
});