import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FiLock, FiAlertCircle, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = () => {
  const [role, setRole] = useState('athlete'); // 'admin' or 'athlete'
  const [identifier, setIdentifier] = useState(''); // username or email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let res;
      
        res = await api.post('/auth/login', { email: identifier, password });


      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: res.data._id,
        name: res.data.username || res.data.name,
        role: res.data.role
      }));
      
      toast.success('Successfully logged in!');
      
      if (res.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Unauthorized access: Invalid credentials');
      } else if (err.response?.status === 403) {
        setError(err.response.data.message);
      } else {
        setError(err.response?.data?.message || 'Server connection failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8"
        >
          <div className="flex gap-4 mb-8 border-b border-white/10 pb-4">
            <button
              onClick={() => { setRole('athlete'); setIdentifier(''); setError(''); }}
              className={`flex-1 pb-2 font-medium transition-colors border-b-2 ${role === 'athlete' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Athlete Login
            </button>
            <button
              onClick={() => { setRole('admin'); setIdentifier(''); setError(''); }}
              className={`flex-1 pb-2 font-medium transition-colors border-b-2 ${role === 'admin' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
            >
              Admin Login
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              {role === 'admin' ? <FiLock className="text-primary text-2xl" /> : <FiUser className="text-primary text-2xl" />}
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">
              {role === 'admin' ? 'Admin Portal' : 'Athlete Portal'}
            </h2>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-3 rounded-lg flex items-center gap-2 mb-6">
              <FiAlertCircle className="shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1" htmlFor="identifier">
                {role === 'admin' ? 'Username' : 'Email Address'}
              </label>
              <input 
                type={role === 'admin' ? 'text' : 'email'}
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full bg-dark-800 border border-dark-700 focus:border-primary outline-none text-white rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-medium mb-1" htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-dark-800 border border-dark-700 focus:border-primary outline-none text-white rounded-lg px-4 py-2"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-primary py-3"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
          
          {role === 'admin' && (
            <div className="mt-6 text-center text-xs text-gray-500">
              <p>Demo Admin defaults created on first run.</p>
              <p>Try <code className="text-primary bg-primary/10 px-1 rounded">admin</code> / <code className="text-primary bg-primary/10 px-1 rounded">password123</code></p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
