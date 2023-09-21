import { describe, expect, it } from 'vitest';
import isDateValid from './isDateValid';

describe('Is', () => {
  it('Test with valid date', () => {
    expect(isDateValid('2001-01-01')).toBeDefined();
  });
  it('Test less than 13 years', () => {
    expect(isDateValid('2022-01-01')).toBeFalsy();
  });
});
