import { useQuery } from '@tanstack/react-query';
import todoQueryKeys from '../../query-keys/todoQueryKeys';
import axios from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;

type Todos = Array<{
  todo_id: number;
  title: string;
  estimate: string;
  description: string;
  project_id: number;
}>;

const queryFunction = async (projectId: number): Promise<Todos> => {
  const res = await axios.get<Todos>(`${API_URL}/todos/${projectId}`);
  if (res.status === 200) {
    return res.data;
  } else throw new Error('An error occured');
};
const useGetTodos = (
  projectId: number
): {
  data: Todos | undefined;
  isLoading: boolean;
} => {
  const { data, isLoading } = useQuery({
    queryKey: todoQueryKeys.list(projectId),
    queryFn: async () => await queryFunction(projectId),
  });

  return { data, isLoading };
};

export default useGetTodos;
