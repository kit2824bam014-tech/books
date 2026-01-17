import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e, bookid) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(bookid);
  };

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
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Our <span className="text-brand">Book</span> Collection
          </h2>
          <div className="h-1 w-24 bg-brand rounded-full mx-auto mb-6" />
          <p className="text-zinc-500 max-w-xl mx-auto font-light">
            Explore our vast library of thoughtfully curated literature, from gripping thrillers to inspiring biographies.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/books/${book._id}`}
              className="glass relative group flex flex-col p-5 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 border border-white/5"
            >
              {/* IMAGE ZONE */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl bg-zinc-900/50 flex items-center justify-center p-4">
                {book.url && book.url.trim() !== "" ? (
                  <img
                    src={book.url}
                    alt={book.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-zinc-600">
                    No Cover
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <span className="text-white text-xs font-semibold tracking-wider uppercase">View Details</span>
                </div>
              </div>

              {/* CONTENT ZONE */}
              <div className="flex flex-col flex-grow">
                <h3 className="font-medium text-lg text-white mb-1 line-clamp-1 group-hover:text-brand transition-colors">
                  {book.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-4">{book.author}</p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-0.5">Price</span>
                    <span className="text-xl font-bold">₹{book.price}</span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, book._id)}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-all duration-500 hover:bg-brand hover:scale-110 active:scale-90 text-white hover:text-black"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
