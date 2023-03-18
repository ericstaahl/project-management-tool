import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { UpdatedTodo } from '../../types/TodoTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    updatedTodo: UpdatedTodo;
    projectId: string | undefined;
    todoId: string | undefined;
}

const useUpdadeTodo = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ updatedTodo, projectId, todoId }: Params) => {
            return await axios.put(
                `${API_URL}/todos/${projectId ?? ''}/${todoId ?? ''}`,
                updatedTodo,
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
        onError: async () => {
            console.log('An error occured when trying to update a to-do.');
        },
    });

    return mutation;
};

export default useUpdadeTodo;
