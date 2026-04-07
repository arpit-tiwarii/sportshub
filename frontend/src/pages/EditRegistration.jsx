import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../services/api';
import { FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';
import { toast } from 'react-toastify';

const EditRegistration = () => {
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const userStr = localStorage.getItem('user');
  const userId = userStr ? JSON.parse(userStr)._id : null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        navigate('/login');
        return;
      }
      
      setLoading(true);
      try {
        const res = await api.get(`/athletes/${userId}`);
        setFormData(res.data);
      } catch (error) {
        toast.error('Failed to load profile. Please try again.');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      await api.put(`/athletes/${userId}`, formData);
      setStatus({ 
        type: 'success', 
        message: 'Profile updated successfully!'
      });
      toast.success('Profile updated successfully!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.message || 'Update failed. Please try again.' 
      });
      toast.error('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 bg-dark-900 text-center text-gray-400">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark-900 relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-6 max-w-2xl relative z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">Athlete Portal</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Edit <span className="text-primary">Profile</span></h1>
          <p className="text-gray-400">Update your personal and sports information.</p>
        </motion.div>

        {formData && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-8 md:p-10"
          >
            {status.message && (
              <div className={`p-4 rounded-lg flex items-center gap-3 mb-6 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                {status.type === 'success' ? <FiCheckCircle className="text-xl flex-shrink-0" /> : <FiAlertCircle className="text-xl flex-shrink-0" />}
                <p className="font-medium">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-6">
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
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-dark-800 border border-dark-700 text-gray-500 rounded-xl px-4 py-3 cursor-not-allowed"
                />
                <p className="text-gray-500 text-xs mt-1">Email cannot be changed</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={saving}
                  className="flex-1 btn-primary flex justify-center items-center"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 border border-dark-700 text-gray-300 hover:text-white hover:border-dark-600 px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EditRegistration;
