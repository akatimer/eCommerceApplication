import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CustModal from './CustModal';
import React from 'react';

describe('Test CustModal renders', () => {
  it('Renders', () => {
    render(<CustModal title="Test" onClick={(): void => {}} />);
    expect(screen.getAllByText(/Test/i)).toBeDefined();
  });
});
