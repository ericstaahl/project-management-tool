import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import useAuth from '../../context/AuthContext';
import { toast } from 'react-toastify';

const API_URL: string = import.meta.env.VITE_API_URL;

interface Params {
    projectId: string | undefined;
    todoId: string | undefined;
}

const useAssignSelf = (): UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    Params,
    unknown
> => {
    const auth = useAuth();

    console.log(auth);

    const mutation = useMutation({
        mutationFn: async ({ projectId, todoId }: Params) => {
            return await axios.put(
                `${API_URL}/todos/${projectId ?? ''}/${
                    todoId ?? ''
                }/assign-self`,
                {},
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
        onError: async () => {
            console.log('An error occured when trying to update a to-do.');
            toast.error('An error occured while updating the to-do.');
        },
    });

    return mutation;
};

export default useAssignSelf;
