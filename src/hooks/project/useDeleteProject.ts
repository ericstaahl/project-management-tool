import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    projectId: string;
}

const useDeleteProject = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const navigate = useNavigate();

    const auth = useAuth();

    const mutation = useMutation({
        mutationFn: async ({ projectId }: Params) => {
            return await axios.delete(`${API_URL}/projects/${projectId}`, {
                headers: {
                    Authorization:
                        auth !== null && auth !== undefined
                            ? `Bearer ${auth.access_token}`
                            : '',
                },
            });
        },
        onSuccess: async () => {
            console.log('Successfully deleted project.');
            navigate('/projects');
        },
        onError: async () => {
            console.log('An error occured when trying to delete the project.');
        },
    });

    return mutation;
};

export default useDeleteProject;
