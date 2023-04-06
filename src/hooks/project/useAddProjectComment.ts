import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import useAuth from '../../context/AuthContext';

interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

interface Params {
    comment: { content: string };
    projectId: string;
}

const API_URL: string = import.meta.env.VITE_API_URL;

const useAddProjectComment = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ projectId, comment }: Params) => {
            return await axios.post(
                `${API_URL}/projects/${projectId}/comment`,
                comment,
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
            console.log('Successfully added new comment.');
        },
        onError: async (err) => {
            if (isAxiosError<ErrorResponse>(err)) {
                console.log(
                    'An error occured when trying to add a new comment.'
                );
            }
        },
    });

    return mutation;
};

export default useAddProjectComment;
