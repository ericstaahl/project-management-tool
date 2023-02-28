import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import React from 'react';
import './assets/css/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProjectPage from './pages/ProjectPage';
import AddTodoPage from './pages/AddTodoPage';
import RegisterUserPage from './pages/RegisterUser';
import LoginUserPage from './pages/LoginUserPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutUserPage from './pages/LogoutUserPage';
import ProjectsPage from './pages/ProjectsPage';
import EditProjectPage from './pages/EditProjectPage';
import CreateProjectPageV2 from './pages/CreateProjectPageV2';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div className='App'>
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<ProtectedRoute />}>
                            <Route path='/dashboard' element={<HomePage />} />
                            <Route
                                path='/projects'
                                element={<ProjectsPage />}
                            />
                            <Route
                                path='/projects/new'
                                element={<CreateProjectPageV2 />}
                            />
                            <Route
                                path='/projects/:id'
                                element={<ProjectPage />}
                            />
                            <Route
                                path='/projects/:id/edit'
                                element={<EditProjectPage />}
                            />
                            <Route
                                path='/projects/:id/new-todo'
                                element={<AddTodoPage />}
                            />
                        </Route>
                        <Route
                            path='/register'
                            element={<RegisterUserPage />}
                        />
                        <Route path='/login' element={<LoginUserPage />} />
                        <Route path='/logout' element={<LogoutUserPage />} />
                    </Routes>
                </div>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
