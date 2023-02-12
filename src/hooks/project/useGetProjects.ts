import { useQuery } from '@tanstack/react-query';
import projectQueryKeys from '../../query-keys/projectQueryKeys';
import axios from 'axios';
import type { Projects } from '../../types/ProjectTypes';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetProjects = (): {
  data:
    | Array<{
        title: string;
        project_id: number;
        number_of_members: number;
        start_date: string;
        due_date: string;
        _count: {
          todo: number;
        };
      }>
    | undefined;
  isLoading: boolean;
} => {
  const auth = useAuth();
  console.log(auth);
  const { data, isLoading } = useQuery({
    queryKey: projectQueryKeys.lists(),
    queryFn: async (): Promise<Projects> => {
      const res = await axios.get<Projects>(`${API_URL}/projects`, {
        headers: {
          Authorization:
            auth !== null && auth !== undefined
              ? `Bearer ${auth.access_token}`
              : '',
        },
      });
      if (res.status === 200) {
        return res.data;
      } else throw new Error('An error occured');
    },
    enabled: auth !== null,
  });

  return { data, isLoading };
};

export default useGetProjects;
