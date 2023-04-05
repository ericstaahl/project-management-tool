import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useAuth from '../../context/AuthContext';
import userQueryKeys from '../../query-keys/userQueryKeys';
import { Member } from '../../types/UserTypes';

const API_URL: string = import.meta.env.VITE_API_URL;

const useGetAllMemnbers = (
    projectId: number | undefined
): {
    data: Member[] | undefined;
    isLoading: boolean;
} => {
    const auth = useAuth();
    const { data, isLoading } = useQuery({
        queryKey: userQueryKeys.list(projectId),
        queryFn: async (): Promise<Member[]> => {
            const res = await axios.get<Member[]>(
                `${API_URL}/users/${projectId ?? ''}`,
                {
                    headers: {
                        Authorization:
                            auth !== null && auth !== undefined
                                ? `Bearer ${auth.access_token}`
                                : '',
                    },
                }
            );
            if (res.status === 200) {
                return res.data;
            } else throw new Error('An error occured');
        },
        keepPreviousData: true,
        enabled: auth !== null && projectId !== undefined,
    });

    return { data, isLoading };
};

export default useGetAllMemnbers;
