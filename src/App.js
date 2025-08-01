// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingpage';
import AdminPage from './admin/admin_login';
import DermaLogin from './dermatologist/derma_login';
import DermaDashboard from './dermatologist/dashboard';
import DermaRegister from './dermatologist/register'
import DermaVerification from './dermatologist/verification';
import SecurityRegister from './dermatologist/security';
import EmailVerification from './dermatologist/emailverification';
import ForgotPassword from './dermatologist/forgotpassword';
import AdminDashboard from './admin/admin_dashboard'; 
import DermaProductManagement from './dermatologist/productmanagement';
import DermaBookings from './dermatologist/bookings';
import DermaPatients from './dermatologist/acceptedpatients';
import DermaSubscription from './dermatologist/subscription';
import DermaProfile from './dermatologist/profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/dermatologist/derma_login" element={<DermaLogin />} />
        <Route path="/dermatologist/dashboard" element={<DermaDashboard />} />
        <Route path="/dermatologist/register" element={<DermaRegister />} />
        <Route path="/dermatologist/verification" element={<DermaVerification />} />
        <Route path="/dermatologist/security" element={<SecurityRegister />} />
        <Route path="/dermatologist/emailverification" element={<EmailVerification />} />
        <Route path="/dermatologist/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dermatologist/productmanagement" element={<DermaProductManagement />} />
        <Route path="/dermatologist/bookings" element={<DermaBookings />} />
        <Route path="/dermatologist/acceptedpatients" element={<DermaPatients />} />
        <Route path="/dermatologist/subscription" element={<DermaSubscription />} />
        <Route path="/dermatologist/profile" element={<DermaProfile />} />
      </Routes>
    </Router>
  );
}

export default App;