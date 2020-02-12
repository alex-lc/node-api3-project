const express = require('express');

const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

// middleware
router.use(express.json());

// POST to create a new user
router.post('/', logger, validateUser, (req, res) => {

  const newUser = req.body;

  Users.insert(newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
    })
});

// POST to create a new post
router.post('/:id/posts', logger, validateUserId, validatePost, (req, res) => {

  const newPost = { ...req.body, user_id: req.params.id };

  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
    })
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


// DELETE a user by id
router.delete('/:id', logger, validateUserId, (req, res) => {
  Users.remove(req.params.id)
    .then(deleted => {
      res.status(200).json(deleted);
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
    })
});

// PUT a user by id
router.put('/:id', logger, validateUser, (req, res) => {

  const { id } = req.params;
  const newUser = req.body;

  Users.update(id, newUser)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "Something went wrong." });
    })
});

//custom middleware
function logger(req, res, next) {
  const date = Date(Date.now());
  console.log(`${req.method} Request to ${req.originalUrl} on ${date}`);
  next();
}

// validate user id's
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

// validate user objects
function validateUser(req, res, next) {

  const newUser = req.body;
  console.log(newUser);

  if (!newUser) {
    res.status(400).json({ error: "Missing user data." });
  }
  else if (!newUser.name) {
    res.status(400).json({ error: "Missing required name field." });
  }
  else {
    next();
  }

}

// validate new posts
function validatePost(req, res, next) {

  const newPost = req.body;
  console.log(newPost);

  if (!newPost) {
    res.status(400).json({ error: "Missing post data." });
  }
  else if (!newPost.text) {
    res.status(400).json({ error: "Missing required text field." });
  }
  else {
    next();
  }

}

module.exports = router;