import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../AuthContext/AuthContext';

const Root: React.FC = () => {
  return (
    <AuthProvider>
      <div>
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </AuthProvider>
  );
};
export default Root;
