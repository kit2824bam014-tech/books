import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = ({ onOpenCart }) => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Books', path: '/books' },
    { name: 'Orders', path: '/orders', auth: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled
        ? 'py-3 bg-black/60 backdrop-blur-xl border-b border-white/5'
        : 'py-6 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all duration-500 group-hover:rotate-12">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-blue-400 overflow-visible transition-colors">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <span className="text-xl font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            BookHub
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            (!link.auth || user) && (
              link.path ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-white drop-shadow-sm ${location.pathname === link.path ? 'text-white' : 'text-zinc-100/90 hover:text-white'
                    }`}
                >
                  {link.name}
                </Link>
              ) : null
            )
          ))}

          {/* Cart with Count */}
          {user && (
            <button
              onClick={onOpenCart}
              className="relative text-sm font-medium transition-all duration-300 hover:text-white drop-shadow-sm text-zinc-100/90 flex items-center gap-1.5 group"
            >
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-brand text-[10px] text-black font-black rounded-full px-1 animate-in zoom-in duration-300">
                  {cart.length}
                </span>
              )}
            </button>
          )}

          <div className="h-4 w-[1px] bg-white/10 mx-2" />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full glass border border-white/20 flex items-center justify-center hover:border-brand/40 transition-all shadow-lg overflow-hidden group/profile relative"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white group-hover/profile:scale-110 transition-transform">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8C18 11.3137 15.3137 14 12 14C8.68629 14 6 11.3137 6 8Z" fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.43094 16.9025C7.05587 16.2213 9.2233 16 12 16C14.771 16 16.9351 16.2204 18.5586 16.8981C20.3012 17.6255 21.3708 18.8613 21.941 20.6587C22.1528 21.3267 21.6518 22 20.9592 22H3.03459C2.34482 22 1.84679 21.3297 2.0569 20.6654C2.62537 18.8681 3.69119 17.6318 5.43094 16.9025Z" fill="currentColor"></path>
                  </svg>
                )}
                <div className="absolute inset-0 border-2 border-transparent group-hover/profile:border-brand/20 rounded-full transition-colors" />
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-64 bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-20 animate-in fade-in zoom-in duration-200 origin-top-right">

                    {/* User Info Section */}
                    <div className="space-y-4 mb-4">
                      <div className="pb-3 border-b border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Email</p>
                        <p className="text-sm font-medium text-zinc-300 truncate">{user.email}</p>
                      </div>

                      <div className="pb-3 border-b border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-1">Address</p>
                        <p className="text-sm font-medium text-zinc-400 leading-relaxed italic line-clamp-2">
                          {user.address || "No address provided"}
                        </p>
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-sm font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                      </div>
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-zinc-100/90 hover:text-white px-4 py-2 transition-all drop-shadow-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn-primary !w-auto !py-2 !px-5 !text-sm !rounded-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle (Simplified for now) */}
        <div className="md:hidden glass w-10 h-10 rounded-xl flex items-center justify-center border border-white/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

