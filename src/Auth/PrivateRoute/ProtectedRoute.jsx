import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from '../../utils/index';
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/auth/?mode=signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
