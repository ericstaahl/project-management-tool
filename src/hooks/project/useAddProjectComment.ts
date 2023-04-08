import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import useAuth from '../../context/AuthContext';
import { Params } from '../../components/CommentSection';

const API_URL: string = import.meta.env.VITE_API_URL;

const useAddProjectComment = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ id: projectId, comment }: Params) => {
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
    });

    return mutation;
};

export default useAddProjectComment;
