import React, { useState, ChangeEvent } from 'react';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import LogInInput from '../LogInInput/LogInInput';

const PasswordInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const passwordMessages = {
    valid: 'Thank you',
    invalid: 'Password is not valid',
  };

  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordMessageColor, setPasswordMessageColor] = useState('');
  const [type, setType] = useState('password');
  const [toggleClass, setToggleClass] = useState('view-toggle');

  function toggleHandler(): void {
    if (type === 'password') {
      setType('text');
      setToggleClass('hide-toggle');
    } else {
      setType('password');
      setToggleClass('view-toggle');
    }
  }

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

  return (
    <>
      <div className="validation-message" style={{ color: passwordMessageColor }}>
        {passwordMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type={type}
          placeholder="Enter your password"
          onChange={passwordHandler}
        />
        <div className={`password-toggle ${toggleClass}`} onClick={toggleHandler}></div>
      </div>
    </>
  );
};

export default PasswordInput;
