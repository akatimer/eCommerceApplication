import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};
export default Root;
