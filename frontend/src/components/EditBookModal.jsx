import React, { useState, useEffect } from 'react';

export default function EditBookModal({ book, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('To Read');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setStatus(book.status);
    }
  }, [book]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...book, title, author, status });
  };

  if (!book) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit} className="edit-book-form">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
          <select value={status} onChange={e => setStatus(e.target.value)}>
            <option>To Read</option>
            <option>Reading</option>
            <option>Completed</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
