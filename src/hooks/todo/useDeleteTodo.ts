import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    projectId: string;
    todoId: string;
}

const useDeleteTodo = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const navigate = useNavigate();

    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ projectId, todoId }: Params) => {
            return await axios.delete(
                `${API_URL}/todos/${projectId ?? ''}/${todoId ?? ''}`,
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
        onSuccess: async (res, params) => {
            console.log('Successfully deleted to-do.');
            navigate(`/projects/${params.projectId}`);
        },
        onError: async () => {
            console.log('An error occured when trying to delete a to-do.');
        },
    });

    return mutation;
};

export default useDeleteTodo;
