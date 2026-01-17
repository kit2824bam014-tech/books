import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:1000/api/v1/cart/get-user-cart', {
                headers: { id: user._id }
            });
            setCart(response.data.data || []);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCart([]);
        }
    }, [user]);

    const addToCart = async (bookid) => {
        if (!user) {
            // Silently return or handle if needed, but user wants no alerts
            return;
        }
        try {
            await axios.put('http://localhost:1000/api/v1/cart/add-to-cart', {}, {
                headers: {
                    id: user._id,
                    bookid: bookid
                }
            });
            // Refetch to get updated count and items
            fetchCart();
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    const removeFromCart = async (bookid) => {
        if (!user) return;
        try {
            await axios.put(`http://localhost:1000/api/v1/cart/remove-from-cart/${bookid}`, {}, {
                headers: { id: user._id }
            });
            setCart(cart.filter(item => item._id !== bookid));
        } catch (error) {
            console.error("Error removing from cart:", error);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, fetchCart, loading }}>
            {children}
        </CartContext.Provider>
    );
};
