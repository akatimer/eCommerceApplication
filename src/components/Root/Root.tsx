import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Baner from '../Baner/Baner';

const Root: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Outlet />
        <Baner />
      </main>
    </div>
  );
};
export default Root;
