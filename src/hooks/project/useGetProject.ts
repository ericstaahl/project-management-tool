import { useQuery, UseQueryResult } from '@tanstack/react-query';
import projectQueryKeys from '../../query-keys/projectQueryKeys';
import axios from 'axios';
import type { Project } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetProject = (
    projectId: string | undefined
): UseQueryResult<Project, unknown> => {
    const auth = useAuth();
    const query = useQuery({
        queryKey: projectQueryKeys.detail(projectId),
        queryFn: async (): Promise<Project> => {
            const res = await axios.get<Project>(
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

    return query;
};

export default useGetProject;
