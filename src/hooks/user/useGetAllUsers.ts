import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import userQueryKeys from '../../query-keys/userQueryKeys';
import { User } from '../../types/UserTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetAllUsers = (): UseQueryResult<User[], unknown> => {
    const auth = useAuth();
    return useQuery({
        queryKey: userQueryKeys.lists(),
        queryFn: async (): Promise<User[]> => {
            const res = await axios.get<User[]>(`${API_URL}/users`, {
                headers: {
                    Authorization:
                        auth !== null && auth !== undefined
                            ? `Bearer ${auth.access_token}`
                            : '',
                },
            });
            if (res.status === 200) {
                return res.data;
            } else throw new Error('An error occured');
        },
        keepPreviousData: true,
        enabled: auth !== null,
    });
};

export default useGetAllUsers;
