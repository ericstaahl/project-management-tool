import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL: string = import.meta.env.VITE_API_URL;

interface User {
    username: string;
    password: string;
}

const useRegisterUser = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    User,
    unknown
> => {
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newUser: User) => {
            return await axios.post(`${API_URL}/users`, newUser);
        },

        onSuccess: async (res) => {
            console.log(res);
            navigate('/');
        },
        onError: async (res) => {
            if (res instanceof AxiosError && res.response?.status === 409) {
                toast.error('Username is already taken.');
            }
        },
    });

    return mutation;
};

export default useRegisterUser;
