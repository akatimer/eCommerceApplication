import React, { ChangeEvent, ReactElement, useState } from 'react';
import './LogIn.css';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';

const colors = {
  validColor: 'green',
  invalidColor: 'red',
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
      setPasswordMessage('password is valid');
      setPasswordMessageColor(colors.validColor);
    } else {
      setPasswordMessage('password is not valid');
      setPasswordMessageColor(colors.invalidColor);
    }
  }
  function emailHandler(event: ChangeEvent<HTMLInputElement>): void {
    const email = event.target.value;
    if (isEmailValid(email)) {
      setEmailMessage('email is valid');
      setEmailMessageColor(colors.validColor);
    } else {
      setEmailMessage('email is not valid');
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
          <input
            type="text"
            placeholder="Enter your email..."
            onChange={(e): void => {
              emailHandler(e);
            }}
            required
          ></input>
        </div>
        <div className="validation-message" style={{ color: passwordMessageColor }}>
          {passwordMessage}
        </div>
        <div className="input-wrapper">
          <input
            type={type}
            placeholder="Enter your password..."
            onChange={(e): void => {
              passwordHandler(e);
            }}
            required
          ></input>
          <div
            className={`password-toggle ${toggleClass}`}
            onClick={(): void => toggleHandler()}
          ></div>
        </div>
        <button className="submit-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
