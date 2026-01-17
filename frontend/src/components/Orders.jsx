import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get('http://localhost:1000/api/v1/orders/get-order-history', {
          headers: { id: user._id }
        });
        setOrders(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
              Order <span className="text-brand">History</span>
            </h2>
            <p className="text-zinc-500 font-light text-lg">
              Track and manage your previous literary acquisitions.
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="glass rounded-[2.5rem] p-16 text-center border border-white/5 bg-white/[0.02]">
            <div className="w-24 h-24 rounded-full glass flex items-center justify-center mx-auto mb-8 opacity-30">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white/50">No orders found</h3>
            <p className="text-zinc-500 mb-8 max-w-md mx-auto">
              It looks like you haven't started your collection yet. Visit our library to find your next great read.
            </p>
            <Link to="/books" className="btn-primary inline-flex items-center gap-2 px-8 py-4">
              Explore Books
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="glass rounded-3xl p-6 border border-white/5 hover:bg-white/[0.05] transition-all duration-500 flex flex-col md:flex-row gap-8 items-center"
              >
                {/* Book Cover Placeholder/Image */}
                <div className="w-24 h-32 flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden border border-white/5 p-2">
                  {order.book?.url ? (
                    <img src={order.book.url} alt={order.book.title} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center opacity-20">📚</div>
                  )}
                </div>

                {/* Order Info */}
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 px-2 py-0.5 rounded">
                      #{order._id.slice(-8)}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${order.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-brand/10 text-brand border-brand/20'
                      }`}>
                      {order.status || 'Order Placed'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand transition-colors">
                    {order.book?.title}
                  </h3>
                  <p className="text-zinc-500 text-sm">{order.book?.author}</p>
                </div>

                {/* Price & Date */}
                <div className="flex flex-col items-center md:items-end gap-1">
                  <span className="text-2xl font-black text-white">₹{order.book?.price}</span>
                  <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-tighter">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* View Details Button (Optional/Modern) */}
                <Link
                  to={`/books/${order.book?._id}`}
                  className="p-3 rounded-full glass hover:bg-brand transition-all group/btn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:text-black">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;