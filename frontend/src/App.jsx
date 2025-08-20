import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/Register.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import NavBar from './components/Navbar.jsx';
import { AuthProvider } from './auth/AuthContext';
import RequireRole from './auth/RequireRole';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('accessToken');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/patient"
              element={
                <ProtectedRoute>
                  <RequireRole allowed={['USER']}>
                    <PatientDashboard />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RequireRole allowed={['ADMIN']}>
                    <AdminDashboard />
                  </RequireRole>
                </ProtectedRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}