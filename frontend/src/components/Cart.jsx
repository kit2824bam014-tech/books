import { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]); // In real app, use context or API

  // For demo, assume some items
  useEffect(() => {
    setCart([
      { id: 1, title: 'The Great Gatsby', price: 10.99 },
      { id: 2, title: '1984', price: 9.99 }
    ]);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">Your cart is empty</p>
          <p className="mt-2">Add some books to get started!</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-800">{item.title}</span>
              <span className="font-semibold text-gray-800">${item.price}</span>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
            <span className="text-xl font-bold text-gray-800">Total:</span>
            <span className="text-xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
          <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 mt-6 transition duration-300 font-semibold">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;