import { useQuery } from '@tanstack/react-query';
import projectQueryKeys from '../../query-keys/projectQueryKeys';
import axios from 'axios';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetProject = (
    projectId: string | undefined
): {
    data:
        | {
              title: string;
              project_id: number;
              number_of_members: number;
              start_date: string;
              due_date: string;
              description?: string;
              _count: {
                  todo: number;
              };
          }
        | undefined;
    isLoading: boolean;
} => {
    const auth = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: projectQueryKeys.detail(projectId),
        queryFn: async (): Promise<Projects[0]> => {
            const res = await axios.get<Projects[0]>(
                `${API_URL}/projects/${projectId ?? ''}`,
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

export default useGetProject;
