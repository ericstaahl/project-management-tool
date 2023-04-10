import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useQuery,
} from '@tanstack/react-query';
import todoQueryKeys from '../../query-keys/todoQueryKeys';
import axios from 'axios';
import type { Todos } from '../../types/TodoTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetTodos = (
    projectId: number,
    sortBy: string = 'title',
    statusFilter: 'NOT_STARTED' | 'IN_PROGRESS' | 'DONE' | null,
    sortOrder: 'asc' | 'desc' = 'asc'
): {
    data: Todos | undefined;
    isLoading: boolean;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<QueryObserverResult<Todos, unknown>>;
} => {
    const auth = useAuth();
    const { data, isLoading, refetch } = useQuery({
        queryKey: todoQueryKeys.list(
            projectId,
            sortBy,
            statusFilter,
            sortOrder
        ),
        queryFn: async (): Promise<Todos> => {
            const res = await axios.get<Todos>(
                `${API_URL}/todos/${projectId}`,
                {
                    headers: {
                        Authorization:
                            auth !== null && auth !== undefined
                                ? `Bearer ${auth.access_token}`
                                : '',
                    },
                    params: {
                        sortRule: sortBy,
                        statusFilter,
                        sortOrder,
                    },
                }
            );
            if (res.status === 200) {
                return res.data;
            } else throw new Error('An error occured');
        },
        keepPreviousData: true,
    });

    return { data, isLoading, refetch };
};

export default useGetTodos;
