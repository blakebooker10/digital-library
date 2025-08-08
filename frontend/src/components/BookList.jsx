import React from 'react';
import BookItem from './BookItem.jsx';

export default function BookList({ books, onEdit, onDelete }) {
  if (!books.length) return <p>No books added yet.</p>;

  return (
    <div className="book-list">
      {books.map(book => (
        <BookItem
          key={book.id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
