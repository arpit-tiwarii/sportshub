import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import EditRegistration from './pages/EditRegistration';
import AdminPaymentPage from './pages/AdminPaymentPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Admin Protected Route Component
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let role = null;
  if(userStr) {
    try { role = JSON.parse(userStr).role; } catch(e){}
  }
  
  if (!token || role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Student Protected Route Component
const StudentRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  let role = null;
  if(userStr) {
    try { role = JSON.parse(userStr).role; } catch(e){}
  }

  if (!token || role !== 'athlete') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-dark-900 text-light font-sans">
        <ToastContainer theme="dark" />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route 
              path="/admin" 
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <StudentRoute>
                  <StudentDashboard />
                </StudentRoute>
              } 
            />
            <Route 
              path="/edit-registration" 
              element={
                <StudentRoute>
                  <EditRegistration />
                </StudentRoute>
              } 
            />
            <Route 
              path="/admin/payments" 
              element={
                <AdminRoute>
                  <AdminPaymentPage />
                </AdminRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
