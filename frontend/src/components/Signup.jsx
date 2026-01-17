import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import avatars from '../assets/avatars.png';

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 5}s`,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
      <div className="gradient-glow" />
    </div>
  );
};

const Signup = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validations
    if (values.password !== values.confirmPassword) {
      return setError('Passwords do not match');
    }
    if (values.password.length <= 5) {
      return setError('Password must be greater than 5 characters');
    }
    if (values.username.length < 4) {
      return setError('Username must be at least 4 characters');
    }

    try {
      await signup(values.username, values.email, values.password, values.address);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 md:py-12 overflow-x-hidden">
      <StarField />

      {/* Main Signup Card */}
      <div className="glass-card w-full max-w-[480px] p-8 md:p-10 relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center mb-8 md:mb-10">
          <div className="w-10 h-10 md:w-12 md:h-12 glass rounded-2xl flex items-center justify-center mb-4 border border-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L14.5 9H21L16 13L18 20L12 16L6 20L8 13L3 9H9.5L12 3Z" fill="white" fillOpacity="0.9" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white mb-1 md:mb-2">Create Account</h1>
          <p className="text-zinc-500 text-sm">Join our community of book lovers</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={values.email}
            onChange={handleChange}
            className="input-field"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                className="input-field pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm"
                value={values.confirmPassword}
                onChange={handleChange}
                className="input-field pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <textarea
            name="address"
            placeholder="Shipping Address"
            value={values.address}
            onChange={handleChange}
            rows="2"
            className="input-field resize-none"
            required
          />

          <button type="submit" className="btn-primary mt-2 md:mt-4">
            Create Account
          </button>
        </form>

        <p className="mt-6 md:mt-8 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link to="/login" className="text-white hover:underline transition-all">
            Login here
          </Link>
        </p>
      </div>

      {/* Footer Avatars Section */}
      <div className="mt-8 md:mt-10 flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
        <p className="text-zinc-500 text-[10px] md:text-xs tracking-wider">Join over <span className="text-white font-medium">2M</span> global book lovers</p>
        <img src={avatars} alt="Global community" className="h-6 md:h-8 object-contain opacity-80" />
      </div>
    </div>
  );
};

export default Signup;