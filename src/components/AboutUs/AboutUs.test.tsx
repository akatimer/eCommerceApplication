import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AboutUs from './AboutUs';
import React from 'react';
import { MemoryRouter } from 'react-router';

describe('Test DateInput Renders', () => {
  it('Renders', () => {
    const { container } = render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    expect(container.querySelector('.main-about-us')).toBeDefined();
  });
});
