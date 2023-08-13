import React from 'react';
import './Registration.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';

const Registration: React.FC = () => {
  return (
    <section className="form form-reg">
      <div className="form-wrapper">
        <form className="auth-form reg-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Sign up</h1>
          <EmailInput />
          <PasswordInput />
          <Button
            label="Continue"
            className="button-login"
            onClick={(): void => {}}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};
export default Registration;
