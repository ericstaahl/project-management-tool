import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../context/AuthContext';

const ProtectedRoute: React.FC = () => {
    const auth = useAuth();
    const location = useLocation();

    if (auth === null) {
        return <Navigate to={'/login'} state={{ from: location }} />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
