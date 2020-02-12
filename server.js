const express = require('express');
const helmet = require('helmet');

const postsRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();

// middleware
server.use(express.json());
server.use(helmet());

server.use('/api/posts', logger, postsRouter);
server.use('/api/users', logger, userRouter);

server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = Date(Date.now());
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`);
  next();
}

module.exports = server;
