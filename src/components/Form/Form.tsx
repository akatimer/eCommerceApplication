import React, { ChangeEvent, ReactElement, useState } from 'react';
import './Form.css';
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

  return (
    <div className="form-wrapper">
      <h1>Authorization</h1>
      <form className="auth-form">
        <div className="validation-message" style={{ color: emailMessageColor }}>
          {emailMessage}
        </div>
        <input
          type="email"
          placeholder="Enter your email..."
          onChange={(e): void => {
            emailHandler(e);
          }}
          required
        ></input>
        <div className="validation-message" style={{ color: passwordMessageColor }}>
          {passwordMessage}
        </div>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e): void => {
            passwordHandler(e);
          }}
          required
        ></input>
        <button className="submit-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
