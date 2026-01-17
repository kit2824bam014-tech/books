import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Books from './components/Books';
import BookDetails from './components/BookDetails';
import Cart from './components/Cart';
import Orders from './components/Orders';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import './App.css';

const NavigationHandler = ({ onOpenCart }) => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/signup'];

  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return <Navbar onOpenCart={onOpenCart} />;
};

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          <NavigationHandler onOpenCart={() => setIsCartOpen(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

