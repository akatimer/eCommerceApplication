import React, { ReactElement } from 'react';
import './Form.css';

export default function Form(): ReactElement {
  return (
    <div className="form-wrapper">
      <h1>Authorization</h1>
      <form className="auth-form">
        <input type="email" placeholder="Enter your email..."></input>
        <input type="password" placeholder="Enter your password..."></input>
        <button className="submit-button" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}
