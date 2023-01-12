import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../types/ProjectTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

const useAddProject = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Project,
  unknown
> => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newProject: Project) => {
      return await axios.post(`${API_URL}/projects`, newProject);
    },
    onSuccess: async () => {
      console.log('Successfully added new project.');
      navigate('/');
    },
    onError: async () => {
      console.log('An error occured when trying to add a new project.');
    },
  });

  return mutation;
};

export default useAddProject;
