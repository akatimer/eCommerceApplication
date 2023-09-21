import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PasswordInput from './PasswordInput';
import React from 'react';

describe('Test PasswordInput renders', () => {
  it('Renders', () => {
    render(<PasswordInput onChange={(): void => {}} placeholder="Enter your password" />);
    expect(screen.getAllByPlaceholderText(/Enter your password/i)).toBeDefined();
  });
});

describe('Test PasswordInput renders without placeholder', () => {
  it('Renders', () => {
    render(<PasswordInput onChange={(): void => {}} />);
    expect(screen.getAllByPlaceholderText(/Enter your password/i)).toBeDefined();
  });
});

describe('Test PasswordInput toogle', () => {
  it('ReadOnly', () => {
    const { container } = render(
      <PasswordInput onChange={(): void => {}} placeholder="Enter your password" />
    );
    const currentInput = screen.getByPlaceholderText('Enter your password');
    const passwordToggle = container.querySelector('.password-toggle');

    if (passwordToggle) {
      fireEvent.click(passwordToggle);
    }
    expect(currentInput).toHaveAttribute('type', 'text');

    if (passwordToggle) {
      fireEvent.click(passwordToggle);
    }
    expect(currentInput).toHaveAttribute('type', 'password');
  });
});
