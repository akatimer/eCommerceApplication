import './LogIn.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';
import { useState } from 'react';
import { createClientWithPass, projectKey } from '../../utils/api/clientBuilder';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

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
            className="button button-login"
            onClick={async (): Promise<void> => {
              const ApiPassRoot: () => ApiRoot = () => {
                return createApiBuilderFromCtpClient(createClientWithPass(email, password));
              };
              const loginResponse = await ApiPassRoot()
                .withProjectKey({ projectKey })
                .login()
                .post({ body: { email: email, password: password } })
                .execute()
                .catch(console.error);
              console.log(loginResponse);
            }}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default LogIn;
