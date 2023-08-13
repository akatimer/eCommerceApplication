import './LogIn.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';

const LogIn: React.FC = () => {
  return (
    <section className="form">
      <div className="form-wrapper">
        <form className="auth-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Sign in</h1>
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

export default LogIn;
