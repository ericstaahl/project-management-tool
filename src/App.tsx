import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import React from 'react';
import './assets/css/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ProjectPage from './pages/project/ProjectPage';
import AddTodoPage from './pages/todo/AddTodoPage';
import RegisterUserPage from './pages/auth/RegisterUserPage';
import LoginUserPage from './pages/auth/LoginUserPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutUserPage from './pages/auth/LogoutUserPage';
import ProjectsPage from './pages/project/ProjectsPage';
import EditProjectPage from './pages/project/EditProjectPage';
import AddProjectPage from './pages/project/AddProjectPage';
import EditTodoPage from './pages/todo/EditTodoPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <div
                    style={{
                        minHeight: '100vh',
                    }}
                    className='App'
                >
                    <Navigation />
                    <Routes>
                        <Route path='/' element={<ProtectedRoute />}>
                            <Route index element={<Dashboard />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route
                                path='/projects'
                                element={<ProjectsPage />}
                            />
                            <Route
                                path='/projects/new'
                                element={<AddProjectPage />}
                            />
                            <Route
                                path='/projects/:id'
                                element={<ProjectPage />}
                            />
                            <Route
                                path='/projects/:id/todo/:todoId/edit'
                                element={<EditTodoPage />}
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
