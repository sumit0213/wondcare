import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a simple implementation. In a real app, you would check
// authentication status from a context or state management system
const ProtectedRoute = ({ children }) => {
  // For now, let's assume the user is always authenticated
  // In a real app, you would check if the user is logged in
  const isAuthenticated = true; // Replace with actual auth check

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute; 