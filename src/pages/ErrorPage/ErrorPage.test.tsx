import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router';
import ErrorPage from './ErrorPage';

describe('Eroor Page Renders', async () => {
  it('Renders', () => {
    const { container } = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    );
    const errorPage = container.querySelector('.error');
    expect(errorPage).toBeDefined();
  });
});
