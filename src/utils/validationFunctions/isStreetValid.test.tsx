import { describe, expect, it } from 'vitest';
import isStreetValid from './isStreetValid';

describe('Is', () => {
  it('Test valid input', () => {
    expect(isStreetValid('17State Street')).toBe(true);
  });
  it('Test empty input', () => {
    expect(isStreetValid('')).toBeFalsy();
  });
  it('Test trailing spaces', () => {
    expect(isStreetValid('Street ')).toBeFalsy();
  });
});
