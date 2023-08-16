import './LogIn.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';
import { useState } from 'react';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="form">
      <div className="form-wrapper">
        <form className="auth-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Sign in</h1>
          <EmailInput onChange={setEmail} />
          <PasswordInput onChange={setPassword} />
          <Button
            label="Continue"
            className="button-login"
            onClick={(): void => {
              console.log(email, password);
            }}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default LogIn;
