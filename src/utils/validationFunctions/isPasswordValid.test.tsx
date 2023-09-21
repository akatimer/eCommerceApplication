import { describe, expect, it } from 'vitest';
import isPasswordValid from './isPasswordValid';

describe('Is', () => {
  it('Test valid pass', () => {
    expect(isPasswordValid('TestTest123')).toBe(true);
  });
  it('Test empty input', () => {
    expect(isPasswordValid('')).toBeFalsy();
  });
  it('Test less than 8 symbols', () => {
    expect(isPasswordValid('AAAA1a')).toBeFalsy();
  });
  it('Test no digit', () => {
    expect(isPasswordValid('TestTestTest')).toBeFalsy();
  });
  it('Test no capitals', () => {
    expect(isPasswordValid('aaaaaa123a')).toBeFalsy();
  });
});
