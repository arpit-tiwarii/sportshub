import { Link } from 'react-router-dom';
import { FiActivity, FiInstagram, FiTwitter, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-dark-900 border-t border-dark-700 pt-16 pb-8">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <FiActivity className="text-white text-2xl" />
              </div>
              <span className="font-display font-bold text-2xl tracking-wide text-white">
                SPORTS<span className="text-primary">HUB</span>
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Train with champions, build your legacy. Join the most elite sports academy designed to unlock your ultimate potential.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <FiInstagram />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <FiTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <FiFacebook />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <FiYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Quick Link</h4>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home Component</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-primary transition-colors">Admissions</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Training Programs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Achievements</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <FiMapPin className="text-primary mt-1 flex-shrink-0" />
                <span className="text-gray-400">123 Champion's Avenue, Sports City, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-primary flex-shrink-0" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-primary flex-shrink-0" />
                <span className="text-gray-400">train@sportshub.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe to get updates on new programs and academy news.</p>
            <div className="flex bg-dark-800 rounded-lg overflow-hidden border border-dark-700">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-transparent border-none outline-none text-white px-4 py-3 w-full"
              />
              <button className="bg-primary hover:bg-[#e64a19] text-white px-4 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Sports Hub Academy. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link to="/login" className="text-gray-500 hover:text-white transition-colors">Admin Login</Link>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
