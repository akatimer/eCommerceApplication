import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PostalCodeInput from './PostalCodeInput';
import React from 'react';

describe('PostalCode', () => {
  it('Renders', () => {
    render(<PostalCodeInput onChange={(): void => {}} value="11111" />);
    expect(screen.getAllByDisplayValue(/11111/i)).toBeDefined();
  });
});
