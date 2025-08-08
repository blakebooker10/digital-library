import React from 'react';

export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Status:</strong> {book.status}</p>
      <button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  );
}

