import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustomInput from './CustomInput';
import React from 'react';
import isNameValid from '../../utils/validationFunctions/isNameValid';

describe('PostalCode', () => {
  it('Renders', () => {
    render(
      <CustomInput
        validColor="#00A000"
        invalidColor="#FF0000"
        validMessage="Thank you"
        invalidMessage="Invalid Message"
        validator={isNameValid}
        placeholder="Enter your name"
        type="text"
        onChange={(): void => {}}
        value="11111"
      />
    );
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});

test('Should test valid input color', () => {
  const correct = 'Valid Input';
  const correctCollor = 'rgb(0, 128, 0)';

  const { getByPlaceholderText, getByText } = render(
    <CustomInput
      validColor={correctCollor}
      invalidColor={'rgb(255,0,0)'}
      validMessage={correct}
      invalidMessage={'Invalid Input'}
      validator={(value): boolean => value.length >= 5}
      placeholder="Test Input"
      type="text"
      onChange={(): void => {}}
    />
  );

  const inputElement = getByPlaceholderText('Test Input');

  fireEvent.change(inputElement, { target: { value: 'validValue' } });

  expect(getByText(correct)).toHaveStyle(`color: ${correctCollor}`);
});

test('Should test invalid input color', () => {
  const incorrectColor = 'rgb(255,0,0)';
  const invalidMessage = 'Invalid Input';

  const { getByPlaceholderText, getByText } = render(
    <CustomInput
      validColor={'rgb(0, 128, 0)'}
      invalidColor={incorrectColor}
      validMessage={'correct'}
      invalidMessage={invalidMessage}
      validator={(value): boolean => value.length >= 5}
      placeholder="Test Input"
      type="text"
      onChange={(): void => {}}
    />
  );

  const inputElement = getByPlaceholderText('Test Input');

  fireEvent.change(inputElement, { target: { value: 'inv' } });

  expect(getByText(invalidMessage)).toHaveStyle(`color: ${incorrectColor}`);
});
