import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth(); // Destructure loading state

  if (loading) {
    return <div>Loading authentication...</div>; 
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
}