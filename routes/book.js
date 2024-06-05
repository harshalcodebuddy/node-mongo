const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const Author = require('../models/Author');
const Genre = require('../models/Genre');

const router = express.Router();

// Create Book
router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).send(book);
  
  // Add book to author's book list
  const author = await Author.findById(book.author);
  author.books.push(book._id);
  await author.save();

  // Add book to each genre's book list
  for (const genreId of book.genres) {
    const genre = await Genre.findById(genreId);
    genre.books.push(book._id);
    await genre.save();
  }
});

router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Fetch Books by Author
router.get('/author/:authorId', async (req, res) => {
  try {
    const { authorId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).send({ error: 'Invalid author ID' });
    }

    const books = await Book.find({ author: authorId }).populate('author genres');
    res.send(books);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error });
  }
});

// Fetch Books by Genre
router.get('/genre/:genreId', async (req, res) => {
  const books = await Book.find({ genres: req.params.genreId }).populate('author genres');
  res.send(books);
});

// Fetch Single Book with Author's Name and Genre Name and Total Books Count
router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author genres');
  const authorBooksCount = await Book.countDocuments({ author: book.author._id });
  const genreBooksCount = await Book.countDocuments({ genres: { $in: book.genres.map(g => g._id) } });

  res.send({
    ...book.toJSON(),
    authorBooksCount,
    genreBooksCount
  });
});

// Delete Book by ID
router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
