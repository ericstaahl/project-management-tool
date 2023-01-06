import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import React from 'react';
import './assets/css/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
};

export default App;
