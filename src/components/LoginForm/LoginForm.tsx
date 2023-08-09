import './LoginForm.css';
import React, { useState } from 'react';
import Button from '../Button/Button';
import InputComponent from '../Input/Input';

interface LoginFormProps {
  onLogin: (login: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onLogin(login, password);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <InputComponent
        className="input-form"
        type="text"
        placeholder="Login"
        value={login}
        onChange={setLogin}
      />

      <InputComponent
        className="input-form"
        placeholder="Password"
        type="password"
        value={password}
        onChange={setPassword}
      />

      <Button className="button-login" label="Continue" onClick={handleSubmit} />
    </form>
  );
};

export default LoginForm;
