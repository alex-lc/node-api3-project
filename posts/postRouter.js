const express = require('express');

const Posts = require('./postDb');

const router = express.Router();

// GET a list of all posts
router.get('/', (req, res) => {
  Posts.get()
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "There was an error retrieving the posts." });
    })
});

// GET a list of posts by post id
router.get('/:id', (req, res) => {
  console.log(req.id);
  // const { id } = req.body;
  // Posts.getById(id)
  //   .then(post => {
  //     console.log(post);
  //     res.status(200).json(post);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ error: "There was an error retrieving the posts." });
  //   })
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
