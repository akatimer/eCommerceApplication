import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import EmailInput from './EmailInput';
import React from 'react';

describe('Test EmailInput Renders', () => {
  it('Renders', () => {
    render(<EmailInput onChange={(): void => {}} value="11111" />);
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});

describe('Test EmailInput can`t be change when read only passed', () => {
  it('ReadOnly', () => {
    render(<EmailInput onChange={(): void => {}} value="11111" readOnlyValue={true} />);
    const currentInput = screen.getByPlaceholderText('Enter your email');
    if (currentInput) {
      fireEvent.change(currentInput, { target: { value: 'inv' } });
    }
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});
