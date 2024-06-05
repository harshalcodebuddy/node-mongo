const express = require('express');
const Genre = require('../models/Genre');

const router = express.Router();

// Create Genre
router.post('/', async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.status(201).send(genre);
});

router.get('/', async (req, res) => {
  try {
    const genre = await Genre.find();
    res.status(200).send(genre);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
