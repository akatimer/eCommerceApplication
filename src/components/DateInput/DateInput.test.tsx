import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import DateInput from './DateInput';
import React from 'react';

describe('Test DateInput Renders', () => {
  it('Renders', () => {
    render(<DateInput onChange={(): void => {}} value="2001-01-01" />);
    expect(screen.getAllByDisplayValue(/2001-01-01/i)).toBeDefined();
  });
});

describe('Test DateInput can`t be change when read only passed', () => {
  it('Render', () => {
    render(<DateInput onChange={(): void => {}} value="2001-01-01" readOnlyValue={true} />);
    const currentInput = screen.getByPlaceholderText('Your date of birth');
    if (currentInput) {
      fireEvent.change(currentInput, { target: { value: 'inv' } });
    }
    expect(screen.getAllByDisplayValue(/2001-01-01/i)).toBeDefined();
  });
});
