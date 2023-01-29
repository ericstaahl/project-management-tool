import React, { createContext, useContext, useState } from 'react';

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
  const token = localStorage.getItem('token');
  const [authState, setAuthState] = useState<AuthState | null>(
    token !== null ? { access_token: token } : null
  );

  console.log(authState);

  const handleSetAuthState: (value: AuthState) => void = (value) => {
    setAuthState(value);
  };

  return (
    <AuthContext.Provider value={authState}>
      <UpdateAuthContext.Provider value={handleSetAuthState}>
        {props.children}
      </UpdateAuthContext.Provider>
    </AuthContext.Provider>
  );
};

export default useAuth;
