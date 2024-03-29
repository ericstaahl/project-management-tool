import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import useAuth from '../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    commentId: string;
    commentRoute: 'todos' | 'projects';
}

const useDeleteProjectComment = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ commentId, commentRoute }: Params) => {
            return await axios.delete(
                `${API_URL}/${commentRoute}/comment/${commentId}`,
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
    });

    return mutation;
};

export default useDeleteProjectComment;
