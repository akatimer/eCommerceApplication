import './LogIn.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';
import { useEffect, useState } from 'react';
import { createClientWithPass, projectKey } from '../../utils/api/clientBuilder';
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { NavLink, useNavigate } from 'react-router-dom';
import { HOME_ROUTE, REGISTRATION_ROUTE, TOKEN_NAME } from '../../utils/constants';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import { useAuth } from '../AuthUse/AuthUse';
import Alert from '@mui/material/Alert';

const LogIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataValid, setIsDataValid] = useState(false);
  const [token, setToken] = useState('');
  const { setLoggedOut } = useAuth();
  const [isModalShown, setIsModalShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(HOME_ROUTE);
    }
    if (isEmailValid(email) && isPasswordValid(password)) {
      setIsDataValid(true);
    }
    const storageToken = localStorage.getItem(TOKEN_NAME);
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
                .catch(() => {
                  console.error;
                  setIsModalShown(true);
                });
              if (loginResponse) {
                setLoggedOut(false);
                navigate(HOME_ROUTE);
              }
            }}
            type="submit"
            disabled={!isDataValid}
          />
        </form>
        <p className="to-route-desc">
          Sign in or&nbsp;
          <NavLink to={REGISTRATION_ROUTE} className="to-route-link">
            create an account
          </NavLink>
        </p>
      </div>
      {isModalShown && (
        <Alert
          severity="error"
          className="auth-modal"
          onClose={(): void => {
            setIsModalShown(false);
          }}
        >
          Account is not found
        </Alert>
      )}
    </section>
  );
};

export default LogIn;
