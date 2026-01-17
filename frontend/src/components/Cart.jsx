import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, fetchCart, loading } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [ordering, setOrdering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && user) {
      fetchCart();
    }
  }, [isOpen, user]);

  const PlaceOrder = async () => {
    try {
      setOrdering(true);
      const response = await axios.post(
        "http://localhost:1000/api/v1/orders/place-order",
        { order: cart },
        { headers: { id: user._id } }
      );
      if (response.data.status === "Success") {
        fetchCart(); // This will clear the cart as backend already cleared it
        alert("Order Placed Successfully!");
        onClose();
        navigate("/orders");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setOrdering(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[200] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold">Your <span className="text-brand">Cart</span></h2>
              <p className="text-zinc-500 text-sm mt-1">{cart.length} items</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </div>
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Find something amazing to read!</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="group relative flex gap-4 p-4 rounded-2xl glass border border-white/5 hover:bg-white/10 transition-all">
                  <div className="w-20 h-24 bg-zinc-900 rounded-lg flex items-center justify-center border border-white/5 overflow-hidden">
                    {item.url ? (
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl opacity-20">📚</span>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-white group-hover:text-brand transition-colors line-clamp-1">{item.title}</h3>
                    <p className="text-zinc-500 text-xs mb-2">{item.author}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="font-bold text-lg text-white">₹{item.price}</span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-zinc-500 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-red-500/10"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-zinc-900/50 border-t border-white/10 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="font-medium">₹{total}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Shipping</span>
                <span className="text-brand font-medium tracking-wide uppercase text-[10px]">Free</span>
              </div>
              <div className="h-[1px] bg-white/5 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-white">₹{total}</span>
              </div>
              <button
                onClick={PlaceOrder}
                disabled={ordering}
                className="btn-primary flex items-center justify-center gap-2 !py-4 shadow-lg active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {ordering ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Check out
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default Cart;