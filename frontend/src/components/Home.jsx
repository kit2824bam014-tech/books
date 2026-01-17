import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get('http://localhost:1000/api/v1/books')
      .then((res) => {
        setFeaturedBooks(res.data.slice(0, 4));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddToCart = (e, bookid) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(bookid);
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pb-20">
      {/* Hero Section - Keeps original layout/image per user request */}
      <section
        className="relative h-[550px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(10,10,10,1)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1500&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Subtle Overlay for better readability */}
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 text-center px-6 animate-in fade-in slide-in-from-bottom duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Discover <span className="text-brand">Amazing</span> Books
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Uncover your next favorite story within our collection of handpicked masterpieces and timeless classics.
          </p>
          <Link
            to="/books"
            className="inline-flex items-center gap-2 !w-auto px-8 py-3.5 text-base font-medium text-white border border-white/20 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/15 hover:border-white/40 hover:backdrop-blur-3xl transition-all duration-500 shadow-lg"
          >
            Explore Library
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-semibold mb-2">Featured Picks</h2>
            <div className="h-1 w-20 bg-brand rounded-full" />
          </div>
          <Link to="/books" className="text-zinc-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 mb-1">
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card h-[400px] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredBooks.map((book) => (
              <Link
                key={book._id}
                to={`/books/${book._id}`}
                className="glass relative group flex flex-col p-5 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 border border-white/5"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-2xl bg-zinc-900/50 flex items-center justify-center p-4">
                  <img
                    src={book.url || '/placeholder.png'}
                    alt={book.title}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase">View Details</span>
                  </div>
                </div>

                <div className="flex flex-col flex-grow">
                  <h3 className="font-medium text-lg text-white mb-1 line-clamp-1 group-hover:text-brand transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-zinc-500 text-sm mb-4">{book.author}</p>

                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xl font-bold">₹{book.price}</span>
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
        )}
      </section>

      {/* Why Choose Us Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Secure Payments</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Your transactions are protected by industry-leading security protocols.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Fast Delivery</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Get your favorite stories delivered to your doorstep in record time.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-3xl glass flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
            </div>
            <h4 className="text-xl font-semibold mb-3">Curated Catalog</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Only the best titles make it to our shelves, quality over quantity.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

