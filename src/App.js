// Enhanced structure for a React web application styled to resemble Goodreads.

import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');

  const fetchBooks = async () => {
    if (!query) {
      setError('Please enter a search term.');
      return;
    }
    setError('');

    try {
      const response = await axios.get(
        https://www.googleapis.com/books/v1/volumes?q=${query}
      );
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Error fetching books. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="font-sans bg-gray-100 w-screen min-h-screen flex flex-col items-center">
      <header className="bg-white shadow p-5 w-full">
        <h1 className="text-4xl font-extrabold text-center text-blue-700">Book Finder</h1>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 border border-gray-300 rounded w-96 mr-3 shadow"
          />
          <button
            onClick={fetchBooks}
            className="p-3 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </header>

      <main className="p-5 w-full flex-grow">
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-gray-200 rounded shadow-lg p-4 flex flex-col items-center"
            >
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo.title}
                  className="w-full max-h-64 object-cover rounded mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-center mb-2">
                {book.volumeInfo.title}
              </h3>
              <p className="text-sm text-gray-600 text-center">
                {book.volumeInfo.authors?.join(', ') || 'Unknown Author'}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-900 text-gray-300 py-10 mt-5 w-full">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Book Finder</h2>
            <p className="text-sm">Discover your next favorite book. Search and explore millions of titles with ease.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">&copy; 2024 Book Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;