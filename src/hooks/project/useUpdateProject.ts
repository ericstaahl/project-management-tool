import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import type { Project } from '../../types/ProjectTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    updatedProject: Project;
    projectId: string;
}

const useUpdateProject = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const navigate = useNavigate();

    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ updatedProject, projectId }: Params) => {
            return await axios.post(
                `${API_URL}/projects/${projectId}`,
                updatedProject,
                {
                    headers: {
                        Authorization:
                            auth !== null && auth !== undefined
                                ? `Bearer ${auth.access_token}`
                                : '',
                    },
                }
            );
        },
        onSuccess: async () => {
            console.log('Successfully updated project.');
            navigate('/projects');
        },
        onError: async () => {
            console.log('An error occured when trying to update project.');
        },
    });

    return mutation;
};

export default useUpdateProject;
