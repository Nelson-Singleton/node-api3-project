//imports
const express = require('express');
var morgan = require('morgan')

//native imports
const router = require('./users/userRouter')

//global variables
const server = express();
const logger = morgan('combined')

//middleware
server.use(express.json());
server.use(logger)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
