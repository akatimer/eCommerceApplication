import React, { ChangeEvent, ReactElement, useState } from 'react';
import './LogIn.css';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import LogInInput from '../LogInInput/LogInInput';

const colors = {
  validColor: 'green',
  invalidColor: 'red',
};
const passwordMessages = {
  valid: 'password is valid',
  invalid: 'password is not valid',
};
const emailMessages = {
  valid: 'email is valid',
  invalid: 'email is not valid',
};

export default function Form(): ReactElement {
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageColor, setPasswordMessageColor] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [emailMessageColor, setEmailMessageColor] = useState('');
  const [type, setType] = useState('password');
  const [toggleClass, setToggleClass] = useState('view-toggle');

  function passwordHandler(event: ChangeEvent<HTMLInputElement>): void {
    const password = event.target.value;
    if (isPasswordValid(password)) {
      setPasswordMessage(passwordMessages.valid);
      setPasswordMessageColor(colors.validColor);
    } else {
      setPasswordMessage(passwordMessages.invalid);
      setPasswordMessageColor(colors.invalidColor);
    }
  }
  function emailHandler(event: ChangeEvent<HTMLInputElement>): void {
    const email = event.target.value;
    if (isEmailValid(email)) {
      setEmailMessage(emailMessages.valid);
      setEmailMessageColor(colors.validColor);
    } else {
      setEmailMessage(emailMessages.invalid);
      setEmailMessageColor(colors.invalidColor);
    }
  }
  function toggleHandler(): void {
    if (type === 'password') {
      setType('text');
      setToggleClass('hide-toggle');
    } else {
      setType('password');
      setToggleClass('view-toggle');
    }
  }

  return (
    <div className="form-wrapper">
      <form className="auth-form" onSubmit={(e): void => e.preventDefault()}>
        <h1 className="form-title">Login</h1>
        <div className="validation-message" style={{ color: emailMessageColor }}>
          {emailMessage}
        </div>
        <div className="input-wrapper">
          <LogInInput
            className="input-form"
            type="text"
            placeholder="Enter your email..."
            onChange={(e): void => {
              emailHandler(e);
            }}
          />
        </div>
        <div className="validation-message" style={{ color: passwordMessageColor }}>
          {passwordMessage}
        </div>
        <div className="input-wrapper">
          <LogInInput
            className="input-form"
            type={type}
            placeholder="Enter your password..."
            onChange={(e): void => {
              passwordHandler(e);
            }}
          />
          <div
            className={`password-toggle ${toggleClass}`}
            onClick={(): void => toggleHandler()}
          ></div>
        </div>
        <button className="button-login" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
