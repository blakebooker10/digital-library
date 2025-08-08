const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'books.json');

function readBooks() {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBooks(books) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(books, null, 2));
}

// Get all books
app.get('/api/books', (req, res) => {
  const books = readBooks();
  res.json(books);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const books = readBooks();
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

// Edit/update a book by id
app.put('/api/books/:id', (req, res) => {
  const books = readBooks();
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(book => book.id === bookId);
  if (index === -1) {
    return res.status(404).json({ message: 'Book not found' });
  }
  books[index] = { id: bookId, ...req.body };
  writeBooks(books);
  res.json(books[index]);
});

// Delete a book by id
app.delete('/api/books/:id', (req, res) => {
  const books = readBooks();
  const bookId = parseInt(req.params.id);
  const newBooks = books.filter(book => book.id !== bookId);
  if (newBooks.length === books.length) {
    return res.status(404).json({ message: 'Book not found' });
  }
  writeBooks(newBooks);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
