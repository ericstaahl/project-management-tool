import { useQuery } from '@tanstack/react-query';
import projectQueryKeys from '../../query-keys/projectQueryKeys';
import axios from 'axios';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetProjects = (
    sortBy: string = 'due_date',
    sortOrder: 'asc' | 'desc' = 'asc'
): {
    data: Projects | undefined;
    isLoading: boolean;
} => {
    const auth = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: projectQueryKeys.list(sortBy, sortOrder),
        queryFn: async (): Promise<Projects> => {
            const res = await axios.get<Projects>(`${API_URL}/projects`, {
                headers: {
                    Authorization:
                        auth !== null && auth !== undefined
                            ? `Bearer ${auth.access_token}`
                            : '',
                },
                params: {
                    sortRule: sortBy,
                    sortOrder,
                },
            });
            if (res.status === 200) {
                return res.data;
            } else throw new Error('An error occured');
        },
        keepPreviousData: true,
        enabled: auth !== null,
    });

    return { data, isLoading };
};

export default useGetProjects;
