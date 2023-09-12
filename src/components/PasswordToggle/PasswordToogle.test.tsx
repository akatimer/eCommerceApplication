import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PasswordToggle from './PasswordToggle';

test('Should change class upon a click', () => {
  const { container } = render(<PasswordToggle />);
  const passwordToggle = container.querySelector('.password-toggle');
  if (passwordToggle) {
    fireEvent.click(passwordToggle);
    expect(passwordToggle).toHaveClass('view-toggle');
  }
});

test('Should contain class upon a double click', () => {
  const { container } = render(<PasswordToggle />);
  const passwordToggle = container.querySelector('.password-toggle');
  if (passwordToggle) {
    fireEvent.click(passwordToggle);
    fireEvent.click(passwordToggle);
    expect(passwordToggle).toHaveClass('hide-toggle');
  }
});

test('Should test custom onClick', () => {
  let a = 5;
  const { container } = render(
    <PasswordToggle
      onClick={(): void => {
        a = a * 2;
      }}
    />
  );
  const passwordToggle = container.querySelector('.password-toggle');
  if (passwordToggle) {
    fireEvent.click(passwordToggle);
    expect(a).toEqual(10);
  }
});
