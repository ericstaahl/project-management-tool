import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import React from 'react';
import './assets/css/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import CreateProjectPage from './pages/CreateProjectPage';
import ProjectPage from './pages/ProjectPage';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/projects/new' element={<CreateProjectPage />} />
          <Route path='/projects/:id' element={<ProjectPage />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
