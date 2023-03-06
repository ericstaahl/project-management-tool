import { useQuery } from '@tanstack/react-query';
import todoQueryKeys from '../../query-keys/todoQueryKeys';
import axios from 'axios';
import type { Todo } from '../../types/TodoTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetTodo = (
    projectId: string | undefined,
    todoId: string | undefined
): {
    data: Todo | undefined;
    isLoading: boolean;
} => {
    const auth = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: todoQueryKeys.detail(projectId, todoId),
        queryFn: async (): Promise<Todo> => {
            const res = await axios.get<Todo>(
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
            if (res.status === 200) {
                return res.data;
            } else throw new Error('An error occured');
        },
        keepPreviousData: true,
        enabled: auth !== null && projectId !== undefined,
    });

    return { data, isLoading };
};

export default useGetTodo;
