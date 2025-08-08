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

app.get('/api/books', (req, res) => {
  const books = readBooks();
  res.json(books);
});

app.post('/api/books', (req, res) => {
  const books = readBooks();
  const newBook = { id: Date.now(), ...req.body };
  books.push(newBook);
  writeBooks(books);
  res.status(201).json(newBook);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
