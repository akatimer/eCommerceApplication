import { describe, expect, it } from 'vitest';
import isPostalCodeValid from './isPostalCodeValid';

describe('Is', () => {
  it('Test with NY post code', () => {
    expect(isPostalCodeValid('10004')).toBe(true);
  });
  it('Test empty input', () => {
    expect(isPostalCodeValid('')).toBeFalsy();
  });
  it('Test CANADA input', () => {
    expect(isPostalCodeValid('K0A 1K1')).toBe(true);
  });
});
