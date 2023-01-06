import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import React from 'react';
import './assets/css/style.css';

const App: React.FC = () => {
  return (
    <div className='App'>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
      </Routes>
    </div>
  );
};

export default App;
