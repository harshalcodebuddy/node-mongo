const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre' }]
});

module.exports = mongoose.model('Book', bookSchema);
