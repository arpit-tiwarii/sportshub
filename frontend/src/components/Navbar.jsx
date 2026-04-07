import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiActivity } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userStr = localStorage.getItem('user');
  let role = null;
  if(userStr) {
    try { role = JSON.parse(userStr).role; } catch(e){}
  }

  const renderNavLinks = () => {
    return (
      <>
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'text-primary' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</Link>
        
        {role === 'admin' && (
          <>
            <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'text-primary' : ''}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
            <Link to="/admin/payments" className={`nav-link ${location.pathname === '/admin/payments' ? 'text-primary' : ''}`} onClick={() => setMobileMenuOpen(false)}>Payments</Link>
          </>
        )}
        
        {role === 'athlete' && (
          <Link to="/dashboard" className={`nav-link ${location.pathname === '/dashboard' ? 'text-primary' : ''}`} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
        )}
      </>
    );
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform duration-300">
            <FiActivity className="text-white text-2xl" />
          </div>
          <span className="font-display font-bold text-2xl tracking-wide text-white">
            SPORTS<span className="text-primary">HUB</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {renderNavLinks()}
          
          {!role ? (
            <div className="flex gap-4">
              <Link to="/login" className="nav-link flex items-center">Login</Link>
              <Link to="/register" className="btn-primary py-2 px-6 text-sm">Join Now</Link>
            </div>
          ) : null}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark-800 border-b border-dark-700 p-6 flex flex-col gap-4 shadow-xl">
          {renderNavLinks()}
          
          {!role ? (
            <div className="flex flex-col gap-4 mt-2 border-t border-dark-700 pt-4">
              <Link to="/login" className="text-white font-medium text-lg hover:text-primary transition-colors" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn-primary text-center border border-primary" onClick={() => setMobileMenuOpen(false)}>Join Now</Link>
            </div>
          ) : null}
        </div>
      )}
    </header>
  );
};

export default Navbar;
