import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth, { useLoadingContext } from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const auth = useAuth();
  const loading = useLoadingContext();

  console.log(auth);
  const location = useLocation();

  console.log(auth, loading);

  if (auth === null) {
    console.log('Null check true');
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
