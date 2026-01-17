import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:1000/api/v1/orders');
        setOrders(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Orders</h2>
      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p className="text-xl">No orders yet</p>
          <p className="mt-2">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{order.book?.title}</h3>
                  <p className="text-gray-600">by {order.book?.author}</p>
                  <p className="text-gray-600">Price: ${order.book?.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                  <p className="text-lg font-semibold text-green-600">Status: {order.status || 'Pending'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;