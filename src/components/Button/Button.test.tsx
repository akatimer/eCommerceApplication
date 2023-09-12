import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Button from './Button';
import React from 'react';

describe('Test Button component renders', () => {
  it('Renders', () => {
    render(
      <Button label="Test Label" className="test_class" type="button" onClick={(): void => {}} />
    );
    expect(screen.getAllByText(/Test Label/i)).toBeDefined();
  });
});
