import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import type { Todo } from '../../types/TodoTypes';
import { useNavigate } from 'react-router-dom';

const API_URL: string = import.meta.env.VITE_API_URL;

const useAddTodo = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Todo,
  unknown
> => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newTodo: Todo) => {
      return await axios.post(
        `${API_URL}/todos/${newTodo.project_id}`,
        newTodo
      );
    },

    onSuccess: async () => {
      console.log('Successfully added new to-do.');
      navigate('/');
    },
    onError: async () => {
      console.log('An error occured when trying to add a new to-do.');
    },
  });

  return mutation;
};

export default useAddTodo;
