import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FiLogOut, FiUser, FiUploadCloud, FiCheckCircle, FiClock, FiXCircle, FiEdit2, FiDollarSign, FiAlertCircle, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadModal, setUploadModal] = useState({ isOpen: false, paymentId: null });
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const userStr = localStorage.getItem('user');
  const userId = userStr ? JSON.parse(userStr)._id : null;

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [profileRes, paymentsRes] = await Promise.all([
        api.get(`/athletes/${userId}`),
        api.get('/payments/my-payments')
      ]);
      setProfile(profileRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error('Failed to load dashboard data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchDashboardData();
    else navigate('/login');
    // eslint-disable-next-line
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleUploadClick = (paymentId) => {
    setUploadModal({ isOpen: true, paymentId });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setUploadFile(selectedFile);
      } else {
        toast.error('Please select an image file');
      }
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setUploadFile(droppedFile);
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const submitUpload = async (e) => {
    e.preventDefault();
    if (!uploadFile) return toast.warning('Please select a file to upload');

    setUploading(true);
    const paymentId = uploadModal.paymentId;
    const formData = new FormData();
    formData.append('screenshot', uploadFile);

    try {
      await api.put(`/payments/${paymentId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      toast.success('✓ Payment proof uploaded successfully!');
      setUploadModal({ isOpen: false, paymentId: null });
      setUploadFile(null);
      fetchDashboardData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to upload proof.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-24 bg-dark-900 text-center text-gray-400">Loading dashboard...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark-900">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 border-b border-dark-700 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
              {profile?.name?.charAt(0) || <FiUser />}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hello, {profile?.name}</h1>
              <p className="text-gray-400">{profile?.sport} Program • Age {profile?.age}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 space-y-6">
              <div>
                <p className="text-gray-400 text-sm mb-1">Full Name</p>
                <p className="text-white font-bold">{profile?.name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-bold break-all">{profile?.email}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Phone</p>
                <p className="text-white font-bold">{profile?.phone}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Sport</p>
                <p className="text-white font-bold">{profile?.sport}</p>
              </div>
              <button 
                onClick={() => navigate('/edit-registration')}
                className="w-full btn-primary py-2 px-4 text-sm shadow-none flex items-center justify-center gap-2 mt-4"
              >
                <FiEdit2 /> Edit Profile
              </button>
            </div>
          </div>

          {/* QR Code & Payment Instructions */}
          <div className="lg:col-span-2">
            <div className="glass-panel p-8 border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {/* QR Code Section */}
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                    <img
                      src="/qr-code.png"
                      alt="Payment QR Code"
                      className="w-40 h-40 object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-400">Scan to Pay</p>
                </div>

                {/* Payment Details Section */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FiDollarSign className="text-primary" />
                      Monthly Fee Payment
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">1</div>
                      <div>
                        <p className="font-medium text-white">Scan QR code with your phone</p>
                        <p className="text-sm text-gray-400">Use PhonePe, Google Pay, or any UPI app</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">2</div>
                      <div>
                        <p className="font-medium text-white">Enter payment amount</p>
                        <p className="text-sm text-gray-400">Check pending amount in the list below</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">3</div>
                      <div>
                        <p className="font-medium text-white">Upload payment screenshot</p>
                        <p className="text-sm text-gray-400">Click "Upload Proof" and upload your payment receipt</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm flex-shrink-0">4</div>
                      <div>
                        <p className="font-medium text-white">Wait for verification</p>
                        <p className="text-sm text-gray-400">Admin will review and mark as approved</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start gap-2">
                    <FiAlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-300">
                      Upload a clear screenshot showing the payment amount and transaction confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Table / Main Area */}
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-white border-b border-dark-700 pb-4 mb-6">Fee Status & History</h2>
          
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p>No fee records found.</p>
              <p className="text-sm">Admin will generate your monthly fee here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map(payment => (
                <div key={payment._id} className="bg-dark-800 rounded-xl p-5 border border-dark-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-primary/50 transition-colors">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">{payment.month} {payment.year}</h3>
                    <p className="text-primary font-bold text-xl mb-2">₹{payment.amount}</p>
                    <div className="flex gap-2 items-center">
                      {payment.status === 'approved' && <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20 flex items-center gap-1"><FiCheckCircle /> Paid</span>}
                      {payment.status === 'rejected' && <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded border border-red-500/20 flex items-center gap-1"><FiXCircle /> Rejected</span>}
                      {payment.status === 'pending' && payment.screenshot && <span className="px-2 py-1 bg-yellow-500/10 text-yellow-500 text-xs rounded border border-yellow-500/20 flex items-center gap-1"><FiClock /> In Review</span>}
                      {payment.status === 'pending' && !payment.screenshot && <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded border border-gray-500/20 flex items-center gap-1"><FiClock /> Unpaid</span>}
                    </div>
                  </div>

                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    {payment.status === 'approved' ? (
                      <div className="text-sm text-gray-500">✓ Verified on {new Date(payment.verifiedAt).toLocaleDateString()}</div>
                    ) : (
                      <div className="flex gap-2 flex-wrap">
                        {payment.screenshot && (
                          <a href={`http://localhost:8000${payment.screenshot}`} target="_blank" rel="noreferrer" className="text-sm border border-dark-700 px-4 py-2 rounded-lg text-gray-300 hover:text-primary transition-colors hover:border-primary/50">
                            View Proof
                          </a>
                        )}
                        <button 
                          onClick={() => handleUploadClick(payment._id)}
                          className="btn-primary py-2 px-4 text-sm shadow-none flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                        >
                          <FiUploadCloud /> {payment.screenshot ? 'Re-upload' : 'Upload Proof'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upload Modal */}
        <AnimatePresence>
          {uploadModal.isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setUploadModal({ isOpen: false, paymentId: null })}
                className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[92%] max-w-sm z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
              >
                <div className="bg-dark-900 p-4 rounded-2xl border-2 border-primary shadow-2xl">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-white">Upload Payment Proof</h2>
                    <button
                      onClick={() => setUploadModal({ isOpen: false, paymentId: null })}
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-dark-700"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={submitUpload} className="space-y-3">
                    {/* File Upload Area */}
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`
                        relative border-3 border-dashed rounded-2xl p-5 text-center cursor-pointer
                        transition-all duration-300
                        ${
                          dragActive
                            ? 'border-primary bg-primary/20 scale-105'
                            : 'border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10'
                        }
                      `}
                    >
                      <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploading}
                      />

                      <div className="space-y-1">
                        <div className="flex justify-center">
                          <div className="bg-primary/30 p-2 rounded-full">
                            <FiUploadCloud className="w-7 h-7 text-primary" />
                          </div>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">
                            {uploadFile ? uploadFile.name : 'Drag image or click to select'}
                          </p>
                          <p className="text-gray-300 text-xs mt-1">
                            {uploadFile ? `${(uploadFile.size / 1024).toFixed(2)} KB` : 'JPG, PNG up to 5MB'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* File Preview */}
                    {uploadFile && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="rounded-xl overflow-hidden bg-dark-800 p-3 border border-primary/30"
                      >
                        <img
                          src={URL.createObjectURL(uploadFile)}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </motion.div>
                    )}

                    {/* Info */}
                    <div className="flex gap-2 bg-blue-500/15 border-2 border-blue-500/50 rounded-lg p-2">
                      <FiAlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-200 font-medium leading-tight">
                        Upload screenshot showing payment amount and transaction ID from your UPI/PhonePe app
                      </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 pt-2 pb-1">
                      <button
                        type="button"
                        onClick={() => setUploadModal({ isOpen: false, paymentId: null })}
                        disabled={uploading}
                        className="flex-1 px-3 py-2 bg-dark-700 text-gray-200 rounded-lg hover:bg-dark-600 transition-colors font-semibold disabled:opacity-50 text-xs border border-dark-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!uploadFile || uploading}
                        className="flex-1 px-3 py-2 btn-primary rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-xs"
                      >
                        {uploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Uploading...
                          </>
                        ) : (
                          <>
                            <FiUploadCloud className="w-4 h-4" />
                            Upload Proof
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default StudentDashboard;
