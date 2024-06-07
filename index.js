const express = require('express');
require('./db'); // Connect to the database

const app = express();
app.use(express.json());

const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');
const genreRouter = require('./routes/genre');

app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/genres', genreRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
