import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;

interface User {
    username: string;
    password: string;
}

interface LoginResponse {
    user_id: number;
    username: string;
    access_token: string;
    refresh_token: string;
}

const useLoginUser = (): UseMutationResult<
    AxiosResponse<LoginResponse, any>,
    unknown,
    User,
    unknown
> => {
    const mutation = useMutation({
        mutationFn: async (userCredentials: User) => {
            return await axios.post(`${API_URL}/users/login`, userCredentials);
        },

        onSuccess: (res) => {
            localStorage.setItem('token', res.data.refresh_token);
            localStorage.setItem(
                'user',
                JSON.stringify({
                    user_id: res.data.user_id,
                    username: res.data.username,
                })
            );
        },
        onError: () => {
            console.log('An error occured when trying to log in user.');
        },
    });

    return mutation;
};

export default useLoginUser;
