import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const requiresAuth = element?.props?.match?.route?.meta?.needAuth;

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/login') {
      navigate(-1);
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
