import React from 'react';

export default function BookItem({ book }) {
  return (
    <div className="book-item">
      <h3>{book.title}</h3>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Status:</strong> {book.status}
      </p>
    </div>
  );
}
