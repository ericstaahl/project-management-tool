import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;

const useRefreshToken = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    string,
    unknown
> => {
    const mutation = useMutation({
        mutationFn: async (refreshToken: string) => {
            return await axios.post(`${API_URL}/users/new-token`, {
                token: refreshToken,
            });
        },

        onError: () => {
            console.log(
                'An error occured when trying to refresh access token.'
            );
        },
    });

    return mutation;
};

export default useRefreshToken;
