import { render, screen } from '@testing-library/react';
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
