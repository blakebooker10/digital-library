import React, { useState, useEffect } from 'react';
import BookList from './components/BookList.jsx';
import AddBookForm from './components/AddBookForm.jsx';
import EditBookModal from './components/EditBookModal.jsx';

function App() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/books')
      .then(res => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  const addBook = (book) => {
    fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
      .then(res => res.json())
      .then(newBook => setBooks([...books, newBook]))
      .catch(console.error);
  };

  const deleteBook = (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (res.ok) setBooks(books.filter(b => b.id !== id));
        else throw new Error('Delete failed');
      })
      .catch(console.error);
  };

  const saveEdit = (updatedBook) => {
    fetch(`http://localhost:5000/api/books/${updatedBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook),
    })
      .then(res => {
        if (!res.ok) throw new Error('Update failed');
        return res.json();
      })
      .then((data) => {
        setBooks(books.map(b => (b.id === data.id ? data : b)));
        setEditingBook(null);
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>Book Tracker</h1>
      <AddBookForm onAdd={addBook} />
      <BookList books={books} onEdit={setEditingBook} onDelete={deleteBook} />
      <EditBookModal
        book={editingBook}
        onClose={() => setEditingBook(null)}
        onSave={saveEdit}
      />
    </div>
  );
}

export default App;
