import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:1000/api/v1/books')
      .then((res) => {
        // filter out books with missing or empty url
        const validBooks = res.data.filter(
          (book) => book.url && book.url.trim() !== ""
        );
        setBooks(validBooks);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center mt-16 font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        Our Book Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition flex flex-col"
          >
            {/* IMAGE ZONE */}
            <div className="h-[280px] bg-gray-100 flex items-center justify-center">
              {book.url && book.url.trim() !== "" ? (
                <img
                  src={book.url}
                  alt={book.title}
                  className="w-[140px] h-[210px] object-contain rounded-md border border-gray-200 bg-white"
                />
              ) : (
                <img
                  src="/placeholder.png"
                  alt="No cover available"
                  className="w-[140px] h-[210px] object-contain rounded-md border border-gray-200 bg-white"
                />
              )}
            </div>

            {/* CONTENT ZONE */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base font-semibold text-gray-800 mb-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{book.author}</p>

              <div className="mt-auto">
                <p className="text-blue-600 font-bold text-lg mb-3">
                  ₹{book.price}
                </p>
                <Link
                  to={`/books/${book._id}`}
                  className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
