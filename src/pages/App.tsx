import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '../styles/index.css';
import Router from '../components/Router/Router';

const App: React.FC = () => {
  return (
    <div className="App">
      <RouterProvider router={Router} />
    </div>
  );
};

export default App;
