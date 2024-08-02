// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, hasRole } from '../utilities/auth';


const ProtectedRoute = ({ children, role }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  if (role && !hasRole(role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
