import React, { ChangeEvent, ReactElement, useState } from 'react';
import './Form.css';
import isPasswordValid from '../../utils/isPasswordValid';

const colors = {
  validColor: 'green',
  invalidColor: 'red',
};

export default function Form(): ReactElement {
  const [checkMessage, setCheckMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  function passwordHandler(event: ChangeEvent<HTMLInputElement>): void {
    const password = event.target.value;
    if (isPasswordValid(password)) {
      setCheckMessage('password is valid');
      setMessageColor(colors.validColor);
    } else {
      setCheckMessage('password is not valid');
      setMessageColor(colors.invalidColor);
    }
  }

  return (
    <div className="form-wrapper">
      <h1>Authorization</h1>
      <form className="auth-form">
        <input type="email" placeholder="Enter your email..." required></input>
        <label style={{ color: messageColor }}>{checkMessage}</label>
        <input
          type="password"
          placeholder="Enter your password..."
          onChange={(e): void => {
            passwordHandler(e);
          }}
        ></input>
        <button className="submit-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
