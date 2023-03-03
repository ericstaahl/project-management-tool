import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    userId: string;
    projectId: string;
}

const useInviteUser = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ userId, projectId }: Params) => {
            return await axios.post(
                `${API_URL}/projects/${projectId}/invite`,
                userId,
                {
                    headers: {
                        Authorization:
                            auth !== null && auth !== undefined
                                ? `Bearer ${auth.access_token}`
                                : '',
                    },
                }
            );
        },
        onSuccess: async () => {
            console.log('Successfully sent invited user.');
        },
        onError: async () => {
            console.log('An error occured when trying to invite user.');
        },
    });

    return mutation;
};

export default useInviteUser;
