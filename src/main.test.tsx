import { expect, test } from 'vitest';
import React, { ReactElement } from 'react';
import { render, screen } from '@testing-library/react';

test('adds 1 + 2 to equal 3', () => {
  const a = 1;
  const b = 2;
  expect(a + b).toBe(3);
});

test('Testing ReactElement', () => {
  const App = (): ReactElement => {
    return <h1>Test h1</h1>;
  };
  expect(<App />).not.toBeNull();
});

describe('App', () => {
  const App = ({ title }: { title: string }): ReactElement => {
    return <h1 title={title}>Test h1</h1>;
  };
  it('renders headline', () => {
    render(<App title="React" />);

    screen.debug();
  });
});

test('chekc App', () => {
  const App = ({ title }: { title: string }): ReactElement => {
    return <h1 title={title}>Test h1</h1>;
  };
  render(<App title="React" />);
  expect(screen.findAllByText('Vite + React')).not.toBeNull();
});
