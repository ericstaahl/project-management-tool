import React, { createContext, useContext, useEffect, useState } from 'react';
import useRefreshToken from '../hooks/user/useRefreshToken';

interface AuthState {
    access_token: string;
    username: string;
    user_id: number;
}

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<AuthState | null | undefined>(null);
const LoadingContext = createContext<boolean>(true);
const UpdateAuthContext = createContext<
    ((state: AuthState | null) => void) | null
>(null);

const useAuth = (): AuthState | null | undefined => {
    return useContext(AuthContext);
};

export const useUpdateAuth: () =>
    | ((state: AuthState | null) => void)
    | null = () => {
    return useContext(UpdateAuthContext);
};

export const useLoadingContext = (): boolean => {
    return useContext(LoadingContext);
};

export const AuthProvider: React.FC<Props> = (props) => {
    const refreshToken = localStorage.getItem('token');
    const refreshAccessToken = useRefreshToken();
    const [authState, setAuthState] = useState<AuthState | null>();

    const handleSetAuthState: (value: AuthState | null) => void = (value) => {
        setAuthState(value);
    };
    useEffect(() => {
        if (refreshToken !== null) {
            refreshAccessToken.mutate(refreshToken, {
                onSuccess: (res) => {
                    setAuthState({
                        access_token: res.data.access_token,
                        user_id: res.data.user.user_id,
                        username: res.data.user.username,
                    });
                },
                onError: () => {
                    setAuthState(null);
                },
            });
        } else setAuthState(null);
    }, []);

    console.log(authState);

    return (
        <AuthContext.Provider value={authState}>
            <UpdateAuthContext.Provider value={handleSetAuthState}>
                {authState === undefined ? <p>Loading...</p> : props.children}
            </UpdateAuthContext.Provider>
        </AuthContext.Provider>
    );
};

export default useAuth;
