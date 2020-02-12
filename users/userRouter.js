const express = require('express');

const Users = require('./userDb');

const router = express.Router();

// middleware
router.use(express.json());

router.post('/', logger, (req, res) => {

});

router.post('/:id/posts', logger, (req, res) => {
  // do your magic!
});

// GET list of all users
router.get('/', logger, (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error retrieving the list of users." });
    });
});

// GET by user id
router.get('/:id', logger, validateUserId, (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(400).json({ error: "Invalid user id." });
    })
});

// GET posts by id
router.get('/:id/posts', logger, validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(400).json({ error: "Invalid user id." });
    })
});

router.delete('/:id', logger, (req, res) => {
  // do your magic!
});

router.put('/:id', logger, (req, res) => {
  // do your magic!
});

//custom middleware
function logger(req, res, next) {
  const date = Date(Date.now());
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`);
  next();
}

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
    .then(user => {
      if (user) {
        next();
      }
      else {
        res.status(400).json({ error: "Invalid user id." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
    })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;