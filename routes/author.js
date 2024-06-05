const express = require('express');
const Author = require('../models/Author');

const router = express.Router();

// Create Author
  router.post('/', async (req, res) => {
    const author = new Author(req.body);
    await author.save();
    res.status(201).send(author);
  });

  router.get('/', async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).send(authors);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
