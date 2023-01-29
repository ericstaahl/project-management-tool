import React, { createContext, useContext, useEffect, useState } from 'react';
import useRefreshToken from '../hooks/user/useRefreshToken';

interface AuthState {
  access_token: string;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthState | null>(null);
const UpdateAuthContext = createContext<((state: AuthState) => void) | null>(
  null
);

const useAuth = (): AuthState | null => {
  return useContext(AuthContext);
};

export const useUpdateAuth: () => ((state: AuthState) => void) | null = () => {
  return useContext(UpdateAuthContext);
};

export const AuthProvider: React.FC<Props> = (props) => {
  const refreshToken = localStorage.getItem('token');
  const refreshAccessToken = useRefreshToken();
  const [authState, setAuthState] = useState<AuthState | null>(null);

  const handleSetAuthState: (value: AuthState) => void = (value) => {
    setAuthState(value);
  };
  useEffect(() => {
    if (refreshToken !== null) {
      refreshAccessToken.mutate(refreshToken, {
        onSuccess: (res) => {
          setAuthState({ access_token: res.data.access_token });
        },
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={authState}>
      <UpdateAuthContext.Provider value={handleSetAuthState}>
        {props.children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default useAuth;
