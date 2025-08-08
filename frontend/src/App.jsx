import React, { useState, useEffect } from 'react';
import BookList from './components/BookList.jsx';
import AddBookForm from './components/AddBookForm.jsx';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then((res) => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  const addBook = (book) => {
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((newBook) => setBooks([...books, newBook]))
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>Book Tracker</h1>
      <AddBookForm onAdd={addBook} />
      <BookList books={books} />
    </div>
  );
}

export default App;
