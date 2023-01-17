import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { useNavigate } from 'react-router-dom';

const API_URL: string = import.meta.env.VITE_API_URL;

interface User {
  username: string;
  password: string;
}

const useRegisterUser = (): UseMutationResult<
  AxiosResponse<any, any>,
  unknown,
  User,
  unknown
> => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (newUser: User) => {
      return await axios.post(`${API_URL}/users`, newUser);
    },

    onSuccess: async () => {
      console.log('Successfully registered user.');
      navigate('/');
    },
    onError: async () => {
      console.log('An error occured when trying to register user');
    },
  });

  return mutation;
};

export default useRegisterUser;
