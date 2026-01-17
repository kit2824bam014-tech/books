import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-cover bg-center h-[450px]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1500&q=80')" }}>
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Amazing Books</h1>
          <p className="text-lg mb-6 max-w-xl">
            Browse the latest bestsellers, new arrivals, & curated collections.
          </p>
          <Link
            to="/books"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-md transition"
          >
            Browse All Books
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* placeholder cards — real ones will come from API */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
              <div className="h-48 bg-gray-200 w-full rounded-lg"></div>
              <h3 className="mt-4 font-semibold text-lg text-gray-800">Book Title</h3>
              <p className="text-gray-600 mt-1">Author</p>
              <p className="text-blue-600 font-bold text-xl mt-2">$XX.XX</p>
              <Link
                to="/books"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md mt-3 hover:bg-blue-700 transition"
              >
                Order Now
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
