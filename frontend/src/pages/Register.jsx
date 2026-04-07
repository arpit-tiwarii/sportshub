import { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    sport: 'Cricket',
    contact: '',
    aadhar: '',
    schoolName: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.post('/athletes', formData);
      setStatus({ 
        type: 'success', 
        message: 'Registration successful! Your account is pending admin approval.'
      });
      toast.success('Registration complete! Please wait for admin approval.');
      setFormData({ name: '', email: '', password: '', age: '', sport: 'Cricket', contact: '', aadhar: '', schoolName: '' });
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      });
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark-900 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-6 max-w-xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Admissions Open</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Join <span className="text-primary">Sports Hub</span></h1>
          <p className="text-gray-400">Register now. Once approved by the admin, you can log in to your student dashboard.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-8 md:p-10"
        >
          {status.message && (
            <div className={`p-4 rounded-lg flex flex-col items-start gap-2 mb-6 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
              <div className="flex items-center gap-3">
                {status.type === 'success' ? <FiCheckCircle className="text-xl flex-shrink-0" /> : <FiAlertCircle className="text-xl flex-shrink-0" />}
                <p className="font-medium">{status.message}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="age">Age</label>
                <input 
                  type="number" 
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="5"
                  max="60"
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                  placeholder="e.g. 15"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="sport">Sport</label>
                <select 
                  id="sport"
                  name="sport"
                  value={formData.sport}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 appearance-none transition-colors"
                >
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Fitness">Fitness & Conditioning</option>
                  <option value="Tennis">Tennis</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="contact">Contact Number</label>
              <input 
                type="tel" 
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="aadhar">Aadhar Number</label>
              <input 
                type="text" 
                id="aadhar"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="12-digit Aadhar number"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2" htmlFor="schoolName">School / College Name</label>
              <input 
                type="text" 
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleChange}
                required
                className="w-full bg-dark-900 border border-dark-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white rounded-xl px-4 py-3 transition-colors"
                placeholder="e.g. ABC School"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary mt-4 flex justify-center items-center"
            >
              {loading ? 'Submitting...' : 'Register as Student'}
            </button>
            <p className="text-center text-sm text-gray-400 mt-4">
              Already registered and approved? <Link to="/login" className="text-primary hover:underline">Log in</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
