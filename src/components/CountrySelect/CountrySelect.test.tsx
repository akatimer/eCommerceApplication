import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CountrySelect from './CountrySelect';
import React from 'react';

describe('Test CountrySelect renders', () => {
  it('Renders', () => {
    render(<CountrySelect onChange={(): void => {}} />);
    expect(screen.getAllByDisplayValue(/USA/i)).toBeDefined();
  });
});
