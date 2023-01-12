import { useQuery } from '@tanstack/react-query';
import todoQueryKeys from '../../query-keys/todoQueryKeys';
import axios from 'axios';
import type { Todos } from '../../types/TodoTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

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
