import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/books/${id}`);
        setBook(res.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(book._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-bold mb-4">Book not found</h2>
        <Link to="/books" className="text-brand hover:underline">Back to library</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Breadcrumb / Back Link */}
        <Link to="/books" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span className="text-sm font-medium">Back to collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Image Showcase */}
          <div className="lg:col-span-5 relative group">
            <div className="glass p-8 rounded-[2.5rem] border border-white/5 overflow-hidden flex items-center justify-center bg-zinc-900/30">
              <img
                src={book.url}
                alt={book.title}
                className="w-full max-h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Background Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand/10 blur-[100px] rounded-full opacity-50" />
          </div>

          {/* Right: Content details */}
          <div className="lg:col-span-7 flex flex-col gap-8 lg:pl-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-black tracking-widest uppercase border border-brand/20">
                  {book.language} Edition
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2 leading-tight">
                {book.title}
              </h1>
              <p className="text-zinc-500 text-lg md:text-xl font-light">
                Written by <span className="text-zinc-300 font-medium">{book.author}</span>
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">Current Price</span>
                <span className="text-4xl font-black text-white flex items-center gap-1">
                  ₹{book.price}
                </span>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <span className="text-zinc-500 text-xs uppercase tracking-[0.2em] font-bold mb-1">Availability</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  In Stock
                </span>
              </div>
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="space-y-4">
              <h3 className="text-sm uppercase tracking-widest font-bold text-zinc-400">Description</h3>
              <p className="text-zinc-400 leading-relaxed font-light text-lg">
                {book.desc}
              </p>
            </div>

            <div className="mt-4">
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full py-3.5 shadow-[0_10px_30px_-10px_rgba(255,215,0,0.2)] active:scale-95 transition-all font-bold"
              >
                Add to Cart
              </button>
            </div>

            {/* Micro details */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <p className="text-zinc-500 text-[10px] uppercase font-black mb-1">Language</p>
                <p className="text-sm font-medium">{book.language}</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                <p className="text-zinc-500 text-[10px] uppercase font-black mb-1">Format</p>
                <p className="text-sm font-medium">Hardcover / PDF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetails;
