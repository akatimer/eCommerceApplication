import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CityInput from './CityInput';
import React from 'react';

describe('Test CityInput Renders', () => {
  it('Renders', () => {
    render(<CityInput onChange={(): void => {}} value="11111" />);
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});

describe('Test CityInput can`t be change when read only passed', () => {
  it('Render', () => {
    render(<CityInput onChange={(): void => {}} value="11111" readOnlyValue={true} />);
    const currentInput = screen.getByPlaceholderText('Enter your city');
    if (currentInput) {
      fireEvent.change(currentInput, { target: { value: 'inv' } });
    }
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});
