import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FiLogOut, FiUsers, FiDollarSign, FiCheckCircle, FiXCircle, FiClock, FiTrash2, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // pending, students, payments, generate
  const [generateForm, setGenerateForm] = useState({ month: 'January', year: new Date().getFullYear(), amount: 1000 });
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentsRes, paymentsRes] = await Promise.all([
        api.get('/athletes'),
        api.get('/payments')
      ]);
      setStudents(studentsRes.data);
      setPayments(paymentsRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
      } else {
        toast.error('Failed to load data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateStudentStatus = async (id, status) => {
    try {
      await api.put(`/athletes/${id}/status`, { status });
      toast.success(`Student ${status} successfully!`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update student status.');
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Delete this registration?')) {
      try {
        await api.delete(`/athletes/${id}`);
        toast.success(`Student deleted successfully!`);
        fetchData();
      } catch (error) {
        toast.error('Failed to delete student.');
      }
    }
  };

  const verifyPayment = async (id, status) => {
    try {
      await api.put(`/payments/${id}/verify`, { status });
      toast.success(`Payment ${status} successfully!`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update payment status.');
    }
  };

  const generatePayments = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/payments/generate', generateForm);
      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error('Failed to generate payments.');
    }
  };

  const pendingStudents = students.filter(s => s.status === 'pending');
  const approvedStudents = students.filter(s => s.status === 'approved');
  
  // Defaulters: Payments that are pending or rejected
  const actionRequiredPayments = payments.filter(p => p.status === 'pending' && p.screenshot); // Need admin review
  const unpaidPayments = payments.filter(p => ['pending', 'rejected'].includes(p.status) && !p.screenshot);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-dark-900">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-dark-700 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-3 rounded-lg">
              <FiUsers className="text-primary text-xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 text-sm">Manage students and payments</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-400/20"
          >
            <FiLogOut /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto gap-4 mb-6 border-b border-dark-700 pb-2">
          <button onClick={() => setActiveTab('pending')} className={`pb-2 px-2 whitespace-nowrap font-medium transition-colors border-b-2 ${activeTab === 'pending' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}>
            Pending Approvals ({pendingStudents.length})
          </button>
          <button onClick={() => setActiveTab('students')} className={`pb-2 px-2 whitespace-nowrap font-medium transition-colors border-b-2 ${activeTab === 'students' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}>
            Approved Students ({approvedStudents.length})
          </button>
          <button onClick={() => setActiveTab('payments')} className={`pb-2 px-2 whitespace-nowrap font-medium transition-colors border-b-2 ${activeTab === 'payments' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}>
            Review Payments ({actionRequiredPayments.length})
          </button>
          <button onClick={() => setActiveTab('defaulters')} className={`pb-2 px-2 whitespace-nowrap font-medium transition-colors border-b-2 ${activeTab === 'defaulters' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}>
            Defaulters / Unpaid ({unpaidPayments.length})
          </button>
          <button onClick={() => setActiveTab('generate')} className={`pb-2 px-2 whitespace-nowrap font-medium transition-colors border-b-2 ${activeTab === 'generate' ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-white'}`}>
            Generate Fees
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-gray-400">Loading data...</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              
              {/* Tab: Pending Approvals */}
              {activeTab === 'pending' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingStudents.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-400 glass-panel">No pending approvals. All caught up!</div>
                  ) : pendingStudents.map(student => (
                    <div key={student._id} className="card flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-white">{student.name}</h3>
                          <span className="text-xs font-medium px-2 py-1 bg-yellow-500/10 text-yellow-500 rounded border border-yellow-500/20">Pending</span>
                        </div>
                        <div className="space-y-2 text-sm text-gray-400">
                          <p><span className="text-gray-500">Email:</span> {student.email}</p>
                          <p><span className="text-gray-500">Sport:</span> {student.sport}</p>
                          <p><span className="text-gray-500">Age:</span> {student.age}</p>
                          <p><span className="text-gray-500">Contact:</span> {student.contact}</p>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6 pt-4 border-t border-dark-700">
                        <button onClick={() => updateStudentStatus(student._id, 'approved')} className="flex-1 btn-primary py-2 text-sm flex items-center justify-center gap-2">
                          <FiCheckCircle /> Approve
                        </button>
                        <button onClick={() => updateStudentStatus(student._id, 'rejected')} className="flex-1 border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors py-2 rounded-full font-semibold text-sm flex items-center justify-center gap-2">
                          <FiXCircle /> Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Approved Students */}
              {activeTab === 'students' && (
                <div className="glass-panel overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-dark-800 border-b border-dark-700">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Email</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Sport</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Contact</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {approvedStudents.length === 0 ? (
                        <tr><td colSpan="5" className="px-6 py-10 text-center text-gray-400">No approved students yet.</td></tr>
                      ) : approvedStudents.map(student => (
                        <tr key={student._id} className="hover:bg-dark-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{student.name}</td>
                          <td className="px-6 py-4 text-gray-300">{student.email}</td>
                          <td className="px-6 py-4"><span className="px-3 py-1 rounded-full text-xs font-medium border bg-primary/10 text-primary border-primary/20">{student.sport}</span></td>
                          <td className="px-6 py-4 text-gray-300">{student.contact}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => deleteStudent(student._id)} className="text-red-400 hover:text-red-300 p-2"><FiTrash2 /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Review Payments */}
              {activeTab === 'payments' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {actionRequiredPayments.length === 0 ? (
                    <div className="col-span-full text-center py-10 text-gray-400 glass-panel">No payments waiting for review.</div>
                  ) : actionRequiredPayments.map(payment => (
                    <div key={payment._id} className="card flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-white max-w-[200px] truncate">{payment.studentId?.name || 'Unknown User'}</h3>
                          <span className="text-sm font-bold text-primary">₹{payment.amount}</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">{payment.month} {payment.year}</p>
                        
                        {payment.screenshot && (
                          <a href={`http://localhost:8000${payment.screenshot}`} target="_blank" rel="noreferrer" className="block w-full h-32 mb-4 bg-dark-900 rounded border border-dark-700 overflow-hidden relative group">
                            <img src={`http://localhost:8000${payment.screenshot}`} alt="Payment Proof" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-white text-sm font-medium flex items-center gap-2"><FiFileText /> View Full Image</span>
                            </div>
                          </a>
                        )}
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button onClick={() => verifyPayment(payment._id, 'approved')} className="flex-1 border-2 border-green-500/50 text-green-400 hover:bg-green-500 hover:text-white transition-colors py-2 rounded font-semibold text-sm">Approve</button>
                        <button onClick={() => verifyPayment(payment._id, 'rejected')} className="flex-1 border-2 border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-colors py-2 rounded font-semibold text-sm">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Defaulters / Unpaid */}
              {activeTab === 'defaulters' && (
                <div className="glass-panel overflow-x-auto">
                  <table className="w-full text-left whitespace-nowrap">
                    <thead className="bg-dark-800 border-b border-dark-700">
                      <tr>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Student Name</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Month/Year</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Amount</th>
                        <th className="px-6 py-4 text-sm font-semibold text-gray-300">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-dark-700">
                      {unpaidPayments.length === 0 ? (
                        <tr><td colSpan="4" className="px-6 py-10 text-center text-gray-400">No unpaid fees.</td></tr>
                      ) : unpaidPayments.map(payment => (
                        <tr key={payment._id} className="hover:bg-dark-800/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-white">{payment.athleteId?.name || 'Unknown'}</td>
                          <td className="px-6 py-4 text-gray-300">{payment.month} {payment.year}</td>
                          <td className="px-6 py-4 text-gray-300 font-medium">₹{payment.amount}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20 flex items-center gap-2 inline-flex">
                              <FiClock /> {payment.status === 'rejected' ? 'Rejected' : 'Unpaid'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Generate Fees */}
              {activeTab === 'generate' && (
                <div className="max-w-md mx-auto">
                  <div className="card">
                    <h2 className="text-xl font-bold text-white mb-4">Generate Monthly Fee</h2>
                    <p className="text-gray-400 text-sm mb-6">This will create a new payment record for all currently approved students for the specified month.</p>
                    
                    <form onSubmit={generatePayments} className="space-y-4">
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Month</label>
                        <select 
                          value={generateForm.month} 
                          onChange={e => setGenerateForm({...generateForm, month: e.target.value})}
                          className="w-full bg-dark-900 border border-dark-700 focus:border-primary outline-none text-white rounded-lg px-4 py-2"
                        >
                          {months.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Year</label>
                        <input 
                          type="number" 
                          value={generateForm.year} 
                          onChange={e => setGenerateForm({...generateForm, year: e.target.value})}
                          className="w-full bg-dark-900 border border-dark-700 focus:border-primary outline-none text-white rounded-lg px-4 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">Amount (₹)</label>
                        <input 
                          type="number" 
                          value={generateForm.amount} 
                          onChange={e => setGenerateForm({...generateForm, amount: e.target.value})}
                          className="w-full bg-dark-900 border border-dark-700 focus:border-primary outline-none text-white rounded-lg px-4 py-2"
                        />
                      </div>
                      <button type="submit" className="w-full btn-primary py-3 mt-4">Generate Records</button>
                    </form>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
