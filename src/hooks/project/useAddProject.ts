import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import type { Project } from '../../types/ProjectTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

const useAddProject = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  Project,
  unknown
> => {
  const navigate = useNavigate();

  const auth = useAuth();

  const mutation = useMutation({
    mutationFn: async (newProject: Project) => {
      return await axios.post(`${API_URL}/projects`, newProject, {
        headers: {
          Authorization: auth !== null ? `Bearer ${auth.access_token}` : '',
        },
      });
    },
    onSuccess: async () => {
      console.log('Successfully added new project.');
      navigate('/dashboard');
    },
    onError: async () => {
      console.log('An error occured when trying to add a new project.');
    },
  });

  return mutation;
};

export default useAddProject;
