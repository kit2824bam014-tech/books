import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:1000/api/v1/books/${id}`)
      .then(res => setBook(res.data));
  }, [id]);

  if (!book) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden md:flex">
        <img
          src={book.url}
          alt={book.title}
          className="md:w-1/3 h-96 object-cover"
        />
        <div className="p-8 md:w-2/3">
          <h2 className="text-3xl font-bold mb-2">{book.title}</h2>
          <p className="text-gray-600 mb-4">by {book.author}</p>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            ${book.price}
          </p>
          <p className="text-gray-700 mb-4">{book.desc}</p>
          <p className="text-sm text-gray-500 mb-6">
            Language: {book.language}
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
