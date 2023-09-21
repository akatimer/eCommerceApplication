import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NameInput from './NameInput';
import React from 'react';

describe('Test NameInput renders', () => {
  it('Renders', () => {
    render(<NameInput onChange={(): void => {}} />);
    expect(screen.getAllByPlaceholderText(/Your name/i)).toBeDefined();
  });
});
