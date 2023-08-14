import React, { useState, ChangeEvent } from 'react';
import isDateValid from '../../utils/validationFunctions/isDateValid';
import LogInInput from '../LogInInput/LogInInput';

const DateInput: React.FC = () => {
  const colors = {
    validColor: 'green',
    invalidColor: 'red',
  };

  const dateMessages = {
    valid: 'Thank you',
    invalid: 'Sorry. You must be over 13 years old',
  };

  const [dateMessage, setDateMessage] = useState('');
  const [dateMessageColor, setDateMessageColor] = useState('');

  function dateHandler(event: ChangeEvent<HTMLInputElement>): void {
    const date = event.target.value;
    if (isDateValid(date)) {
      setDateMessage(dateMessages.valid);
      setDateMessageColor(colors.validColor);
    } else {
      setDateMessage(dateMessages.invalid);
      setDateMessageColor(colors.invalidColor);
    }
  }

  return (
    <>
      <div className="validation-message" style={{ color: dateMessageColor }}>
        {dateMessage}
      </div>
      <div className="input-wrapper">
        <LogInInput
          className="input-form"
          type="date"
          placeholder="Your date of birth"
          onChange={dateHandler}
        />
      </div>
    </>
  );
};

export default DateInput;
