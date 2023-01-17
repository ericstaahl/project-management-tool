import { useQuery } from '@tanstack/react-query';
import projectQueryKeys from '../../query-keys/projectQueryKeys';
import axios from 'axios';
import type { Projects } from '../../types/ProjectTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

const queryFunction = async (): Promise<Projects> => {
  const res = await axios.get<Projects>(`${API_URL}/projects`);
  if (res.status === 200) {
    return res.data;
  } else throw new Error('An error occured');
};
const useGetProjects = (): {
  data:
    | Array<{
        title: string;
        project_id: number;
        number_of_members: number;
        start_date: string;
        due_date: string;
      }>
    | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery({
    queryKey: projectQueryKeys.lists(),
    queryFn: queryFunction,
  });

  return { data, isLoading };
};

export default useGetProjects;