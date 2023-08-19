import './LogIn.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';
import { useEffect, useState } from 'react';
import { createClientWithPass, projectKey } from '../../utils/api/clientBuilder';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/constants';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataValid, setIsDataValid] = useState(false);
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(HOME_ROUTE);
    }
    if (isEmailValid(email) && isPasswordValid(password)) {
      setIsDataValid(true);
    }
    const storageToken = localStorage.getItem('token');
    if (storageToken) {
      setToken(storageToken);
    }
  }, [email, navigate, password, token]);
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
              if (loginResponse) {
                navigate(HOME_ROUTE);
              }
            }}
            type="submit"
            disabled={!isDataValid}
          />
        </form>
      </div>
    </section>
  );
};

export default LogIn;
