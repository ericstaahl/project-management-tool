import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../../context/AuthContext';
import type { Project } from '../../types/ProjectTypes';

interface ErrorResponse {
    statusCode: number;
    error: string;
    message: string;
}

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
                    Authorization:
                        auth !== null && auth !== undefined
                            ? `Bearer ${auth.access_token}`
                            : '',
                },
            });
        },
        onSuccess: async () => {
            console.log('Successfully added new project.');
            navigate('/projects');
        },
        onError: async (err) => {
            if (isAxiosError<ErrorResponse>(err)) {
                console.log(
                    'An error occured when trying to add a new project.'
                );
                if (err.response?.data.message !== undefined) {
                    const error = JSON.parse(err.response?.data.message);
                    console.log(error);
                    if (error[0].message !== undefined)
                        toast.error(error[0].message);
                }
            }
        },
    });

    return mutation;
};

export default useAddProject;
