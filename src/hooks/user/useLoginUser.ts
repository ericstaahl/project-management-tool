import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

const API_URL: string = import.meta.env.VITE_API_URL;

interface User {
  username: string;
  password: string;
}

const useLoginUser = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  User,
  unknown
> => {
  const mutation = useMutation({
    mutationFn: async (userCredentials: User) => {
      return await axios.post(`${API_URL}/users/login`, userCredentials);
    },

    onSuccess: (res) => {
      localStorage.setItem('token', res.data.refresh_token);
    },
    onError: () => {
      console.log('An error occured when trying to log in user.');
    },
  });

  return mutation;
};

export default useLoginUser;
