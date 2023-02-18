import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateAuth } from '../../context/AuthContext';

const useLogoutUser = (): void => {
    const updateAuth = useUpdateAuth();
    const navigate = useNavigate();

    useEffect(() => {
        console.log('logging out');

        localStorage.removeItem('token');
        if (updateAuth !== null) updateAuth(null);

        navigate('/login');
    }, []);
};

export default useLogoutUser;
