import './MainLogIn.css';
import React from 'react';
import LoginForm from '../LoginForm/LoginForm';

const MainLogIn: React.FC = () => {
  return (
    <main className="main">
      <LoginForm
        onLogin={function (login: string, password: string): void {
          console.log(login, password);
        }}
      />
    </main>
  );
};

export default MainLogIn;
