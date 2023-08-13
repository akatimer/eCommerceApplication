import React, { useState, ChangeEvent } from 'react';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import LogInInput from '../LogInInput/LogInInput';

const EmailInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const emailMessages = {
    valid: 'email is valid',
    invalid: 'email is not valid',
  };

  const [emailMessage, setEmailMessage] = useState('');
  const [emailMessageColor, setEmailMessageColor] = useState('');

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

  return (
    <>
      <div className="validation-message" style={{ color: emailMessageColor }}>
        {emailMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="text"
          placeholder="Enter your email..."
          onChange={emailHandler}
        />
      </div>
    </>
  );
};

export default EmailInput;
