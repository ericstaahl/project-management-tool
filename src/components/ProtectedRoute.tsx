import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
  const auth = useAuth();
  // console.log(auth);
  const location = useLocation();

  // console.log(auth);

  if (auth === null) {
    console.log('Null check true');
    return <Navigate to={'/login'} state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
